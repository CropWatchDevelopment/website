# V25 model for the /home service animation

`static/assets/3d/v25-revB2.glb` is built from the FreeCAD model of the V25 plastic case,
REV B.2 (`Enclosures-reduction/V25_Plastic/Case.FCStd`, branch `reduction`). The animation
code is `src/lib/components/v25-teardown/`.

## What goes in the GLB

One node per moving part, each with its pivot in `extras.pivot` (Y-up mm):
`base`, `cover_aa`, `sensor_cover`, `gasket`, `inserts`, `sensor`, `pcb`, `led`, `holder`,
`holder_contacts`, `bracket` (the WGMB-1 pole bracket), and `potting`.

`potting` is not in the CAD. `export_v25.py` makes it as the open volume of the main board bay
(front partition to the board divider wall), from the floor to Z 9.3. That is 0.25 under the
floor of the QWIIC cable passage, so the epoxy stays out of it. The JST-SH I2C connectors
(top Z 11.27) stand about 2 mm clear, and the tallest SMD part (Z 8.83) is still covered; the
script asserts this. The volume is about 27.1 cm³ before the board and parts take their share.
Its pivot sits on the bay floor so the animation can fill it upwards.

Left out on purpose:

- the optional M12 glands (`OptionalGlands`);
- the D-cell holder and D cover;
- both copper layers, which sit under the solder mask;
- the EDLY screws, washers, AA cells and QWIIC plugs. `parts.ts` draws these, because the
  CAD screws have no hex socket or thread and the cell envelopes are plain cylinders.

The QWIIC cable centreline in `scene.ts` (`CABLE`) comes from the `QwiicCableRoute` faces.

## Rebuild

1. Export the tessellation with the FreeCAD flatpak (about 40 s):

   ```bash
   flatpak run --env=V25_OUT=$HOME/.cache/v25-model --command=freecadcmd org.freecad.FreeCAD \
     -c "exec(open('$PWD/scripts/v25-model/export_v25.py').read())"
   ```

   `V25_FCSTD` overrides the path to `Case.FCStd`. Colours come from each object's
   `ShapeAppearance` in `GuiDocument.xml`. Objects left at FreeCAD's default grey get the
   overrides in `OVERRIDE`.

2. Build the GLB. glTF-Transform is not a site dependency, so install it in a scratch folder:

   ```bash
   mkdir -p /tmp/v25-glb && cd /tmp/v25-glb && npm init -y >/dev/null
   npm i @gltf-transform/core@4 @gltf-transform/functions@4 @gltf-transform/extensions@4 meshoptimizer
   cp ~/source/repos/cropwatch/website/scripts/v25-model/build.mjs .
   node build.mjs ~/.cache/v25-model ~/source/repos/cropwatch/website/static/assets/3d/v25-revB2.glb
   ```

   The export has about 1.4 million triangles. `build.mjs` simplifies each part to the error
   budget in `ERR`, which brings it to about 73,000 triangles. It then quantises the mesh and
   applies `EXT_meshopt_compression` (540 KB). three.js decodes it with `MeshoptDecoder`.

The same export on the same `Case.FCStd` gives a byte-identical GLB.

If a revision moves the screws, the cable route, the LED or the magnets, update the
coordinates in `scene.ts` (`LUGS`, `FRONT`, `CABLE`, the label anchors) to match.
