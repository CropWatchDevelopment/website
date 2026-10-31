# Tessellate the V25 parts with their GUI face colours for the website animation
# (src/lib/components/v25-teardown). Runs inside FreeCAD; see README.md.
# Writes OUT/nodes.json (one entry per part: pivot, bounding box, one primitive per colour)
# plus OUT/pos.bin (float32 xyz, CAD mm, relative to the pivot) and OUT/idx.bin (uint32).
import FreeCAD as App, json, os, struct, zipfile, re
SRC=os.environ.get('V25_FCSTD', os.path.expanduser('~/source/repos/cropwatch/Enclosures-reduction/V25_Plastic/Case.FCStd'))
D=os.environ.get('V25_OUT', os.path.expanduser('~/.cache/v25-model')).rstrip('/')+'/'
os.makedirs(D, exist_ok=True)
doc=App.openDocument(SRC)
g=doc.getObject
zf=zipfile.ZipFile(SRC)
gui=zf.read('GuiDocument.xml').decode('utf8')
appear={}
for m in re.finditer(r'<ViewProvider name="([^"]+)"(.*?)</ViewProvider>', gui, re.S):
    mm=re.search(r'name="ShapeAppearance".*?<MaterialList file="([^"]+)"', m.group(2), re.S)
    if mm: appear[m.group(1)]=mm.group(1)
def colors(name):
    f=appear.get(name)
    if not f: return None
    b=zf.read(f)
    n=struct.unpack_from('<I',b,0)[0]
    out=[]
    for i in range(n):
        amb,dif,spe,emi=struct.unpack_from('<IIII',b,4+i*24)
        shin,tr=struct.unpack_from('<ff',b,4+i*24+16)
        out.append(((dif>>24)&255,(dif>>16)&255,(dif>>8)&255,round(tr,3)))
    return out

DEFAULT=(114,121,128,0)
OVERRIDE={'PcbRev9_Pads':(198,160,72,0),'PcbRev9_SW1':(186,188,192,0),'PcbRev9_SW2':(186,188,192,0),'PcbRev9_SW3':(186,188,192,0),
 'PcbRev9_L2':(46,46,48,0),'PcbRev9_J7':(205,170,90,0),'PcbRev9_U7':(38,37,37,0),'PcbRev9_U4_2':(205,205,200,0),'PcbRev9_U3':(196,198,202,0),
 'PcbRev9_MaskTop':(31,92,58,0),'PcbRev9_MaskBottom':(31,92,58,0),'Part__Feature020':(31,92,58,0),'Part__Feature021':(31,92,58,0)}
SKIP={'PcbRev9_Copper','Part__Feature017'}
bufP=bytearray(); bufI=bytearray()
nodes={}
def add(node, obj_names, pivot=None, tol=0.03, face_filter=None, solid_filter=None):
    prims={}
    allbb=App.BoundBox()
    shapes=[]
    for on in obj_names:
        if on in SKIP: continue
        o=g(on); sh=o.Shape
        cols=[OVERRIDE[on]] if on in OVERRIDE else (colors(on) or [DEFAULT])
        cols=[(c[0],c[1],c[2],0) for c in cols]
        faces=sh.Faces
        keep=None
        if solid_filter:
            keep=set()
            for s in sh.Solids:
                if solid_filter(s):
                    for f in s.Faces: keep.add(f.hashCode())
        for i,f in enumerate(faces):
            if keep is not None and f.hashCode() not in keep: continue
            if face_filter and not face_filter(f): continue
            c=cols[i] if len(cols)==len(faces) else cols[0]
            shapes.append(f); allbb.add(f.BoundBox)
            prims.setdefault(c,[]).append(f)
    if pivot is None: pivot=(allbb.Center.x,allbb.Center.y,allbb.Center.z)
    px,py,pz=pivot
    out=[]
    tris=0
    for c,faces in prims.items():
        P=[];I=[]
        for f in faces:
            try: pts,tri=f.tessellate(tol,True)
            except Exception as e: print('tess fail',node,e); continue
            base=len(P)
            P.extend(pts); I.extend((a+base,b+base,cc+base) for a,b,cc in tri)
        if not I: continue
        po=len(bufP)//4; io=len(bufI)//4
        for p in P: bufP.extend(struct.pack('<fff',p.x-px,p.y-py,p.z-pz))
        for t in I: bufI.extend(struct.pack('<III',*t))
        out.append(dict(color=list(c[:3]),alpha=1-c[3],pos=[po,len(P)*3],idx=[io,len(I)*3]))
        tris+=len(I)
    nodes[node]=dict(pivot=list(pivot),prims=out,bb=[allbb.XMin,allbb.YMin,allbb.ZMin,allbb.XMax,allbb.YMax,allbb.ZMax])
    print(node,'tris',tris,'prims',len(out))

add('base',['Body'],tol=0.04)
add('cover_aa',['CoverAA'],tol=0.04)
add('sensor_cover',['SensorCover'],tol=0.03)
add('gasket',['CompressedGasket'],tol=0.05)
for i in range(1,9):
    w=g('Washer%d'%i).Shape.BoundBox
    pv=(w.Center.x,w.Center.y,w.ZMax)
    add('screw%d'%i,['Screw%d'%i],pivot=pv,tol=0.01)
    add('washer%d'%i,['Washer%d'%i],pivot=(w.Center.x,w.Center.y,w.ZMin),tol=0.01)
add('inserts',['Insert%d'%i for i in range(1,9)],tol=0.02)
sb=[o.Name for o in g('SensorBoard_Reference').Group]
add('sensor',sb,tol=0.03)
add('sensor_plug',['SensorQwiicPlug'],tol=0.02)
add('board_plug',['BoardQwiicPlug'],tol=0.02)
pcb=[o.Name for o in g('PCB_Rev9_Reference').Group if o.Name!='PcbRev9_D3']
add('pcb',pcb,tol=0.04)
add('led',['PcbRev9_D3'],tol=0.02)
add('holder',['Part__Feature087'],tol=0.03,solid_filter=lambda s: s.BoundBox.XMax<31 and s.Volume>1000)
add('holder_contacts',['Part__Feature087'],tol=0.12,solid_filter=lambda s: s.BoundBox.XMax<31 and s.Volume<1000)
add('bracket',['Part__Feature088'],tol=0.05)
add('cell1',['CellAA1'],tol=0.02)
add('cell2',['CellAA2'],tol=0.02)
# Black epoxy potting over the main PCB (not in the CAD): the open volume of the board bay,
# from the front partition to the board divider wall. The surface stays 0.25 under the floor
# of the QWIIC cable passage (CableSealVolume, Z 9.55), so no epoxy runs into the passage, and
# the JST-SH I2C connectors J3/J4/J5 (top Z 11.27) stand clear of it with their openings dry.
# It must still cover every SMD part on the board.
import Part
V=App.Vector
top=g('CableSealVolume').Shape.BoundBox.ZMin-0.25
proud=('PcbRev9_J1','PcbRev9_J3','PcbRev9_J4','PcbRev9_J5','PcbRev9_D3') # stand above the epoxy
smd=max(o.Shape.BoundBox.ZMax for o in g('PCB_Rev9_Reference').Group if o.Name not in proud and o.Shape.Solids)
assert smd < top-0.3, ('potting does not cover the tallest SMD part', smd, top)
print('potting covers SMD parts up to Z',round(smd,2),'connector tops Z',round(g('PcbRev9_J4').Shape.BoundBox.ZMax,2))
bay=Part.makeBox(95,47.5,top,V(-47.5,-41.5,0)).cut(g('Body').Shape)
pot=[s for s in bay.Solids if s.isInside(V(0,-15,8),1e-6,True)][0]
bb=pot.BoundBox
doc.addObject('Part::Feature','Potting').Shape=pot
add('potting',['Potting'],pivot=(bb.Center.x,bb.Center.y,bb.ZMin),tol=0.03) # pivot on the floor: it fills upwards
print('potting top Z',round(top,3),'volume cm3',round(pot.Volume/1000,2),'bb',[round(v,2) for v in (bb.XMin,bb.YMin,bb.ZMin,bb.XMax,bb.YMax,bb.ZMax)])
open(D+'pos.bin','wb').write(bufP)
open(D+'idx.bin','wb').write(bufI)
json.dump(nodes,open(D+'nodes.json','w'),indent=0)
print('EXPORT DONE', len(bufP)//12, 'verts', len(bufI)//12,'tris')
