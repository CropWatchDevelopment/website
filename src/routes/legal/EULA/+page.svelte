<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import '$lib/styles/legal.css';

	const title = 'Service Terms of Use (EULA) | CropWatch';
	const description = 'Service Terms of Use for cloud services provided by CropWatch, LLC.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://cropwatch.io/legal/EULA" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/home' }, { label: 'Service Terms of Use' }]} />

<article class="legal-doc">
	<h1>Service Terms of Use</h1>

	<hr />

	<h2>Chapter 1: General Provisions</h2>

	<h3>Article 1.1 (About These Terms)</h3>
	<p>
		These Service Terms of Use (the “Terms”) set out the matters that Users must observe when using
		the cloud services for the provision of data and related functions (the “Service”) provided by
		CropWatch, LLC (the “Company”).
	</p>

	<h3>Article 1.2 (Definitions)</h3>
	<p>The following terms have the meanings given below in these Terms.</p>
	<ol class="list-legal">
		<li>
			(1) “Administrator” means an officer or employee of a Customer who is authorized to act on
			behalf of the Customer to manage the Customer’s User Accounts and to amend or terminate the
			Service Agreement, or the Customer if the Customer is an individual.
		</li>
		<li>
			(2) “Customer” means a business operator that has agreed to these Terms and entered into a
			Service Agreement with the Company.
		</li>
		<li>
			(3) “Intellectual Property Rights” means copyrights, including the rights set out in Articles
			27 and 28 of the Copyright Act, patent rights, utility model rights, design rights, trademark
			rights, and all other intellectual property rights, including the rights to acquire them and
			rights under pending applications.
		</li>
		<li>
			(4) “Anonymized Data” means information created by applying certain processing, including
			statistical processing or analysis, to User Information and Service Data so that no
			individual, including a User, can be identified or distinguished.
		</li>
		<li>
			(5) “Password” means a combination of single-byte alphanumeric characters and symbols that a
			User sets in accordance with the prescribed requirements and that, together with a Login ID,
			is used to distinguish that User from other users of the Service.
		</li>
		<li>
			(6) “Service Agreement” means an agreement between a Customer and the Company concerning use
			of the Service.
		</li>
		<li>
			(7) “Software” means software provided by the Company for the Service, including software
			embedded in the Hardware.
		</li>
		<li>
			(8) “Service Data” means data collected through the Service and data produced by processing,
			analyzing, or otherwise modifying that data.
		</li>
		<li>
			(9) “Hardware” means information terminals, sensors, communications equipment, and other
			hardware provided by the Company or prepared by a User for collecting or transmitting Service
			Data, automating equipment, or related purposes.
		</li>
		<li>
			(10) “User” means an officer, employee, or other individual designated by a Customer who
			agrees to these Terms and uses the Service.
		</li>
		<li>(11) “User Account” means an account created by a Customer or User to use the Service.</li>
		<li>
			(12) “User Information” means all information provided directly or indirectly to the Company
			by a Customer or User through use of the Service, including information registered with the
			Service by a Customer or User and the information specified in Article 3.1, as well as
			information produced by processing, analyzing, or otherwise modifying that information, but
			excluding Service Data.
		</li>
		<li>
			(13) “Login ID” means an email address or other identifier, consisting of single-byte
			alphanumeric characters and symbols registered by a User, that is used to distinguish that
			User from other users when using the Service.
		</li>
	</ol>

	<h3>Article 1.3 (Application and Amendment of These Terms)</h3>
	<ol>
		<li>
			The Company permits Customers and Users to use the Service and Software subject to the
			conditions stated in these Terms.
		</li>
		<li>
			These Terms apply to the Service Agreement between a Customer and the Company and to a User’s
			use of the Service. The Company may separately establish conditions of use, regardless of
			their title (the “Individual Terms”), for a particular service provided by the Company (an
			“Individual Service”) and publish them on the Company’s website or by other means. In that
			case, a user of the Individual Service shall use it only after agreeing to the Individual
			Terms. Any Individual Terms established by the Company are incorporated into and form part of
			these Terms.
		</li>
		<li>
			If a Customer and the Company agree in a Service Agreement to conditions that differ from
			these Terms, including in the case described in the preceding paragraph, the conditions of the
			Service Agreement take precedence over these Terms.
		</li>
		<li>
			The Company may amend these Terms at any time. When amending these Terms, the Company shall
			set an effective date and notify Customers and Users that the Terms will be amended, the
			content of the amended Terms, and their effective date by publishing that information on the
			Company’s website or by another appropriate method.
		</li>
		<li>
			If a Customer or User continues to use the Service on or after the effective date set under
			the preceding paragraph, that Customer or User is deemed to have agreed to the amended Terms,
			and the Service Agreement is amended in accordance with that agreement.
		</li>
	</ol>

	<h3>Article 1.4 (Service Agreement)</h3>
	<p>
		A Service Agreement is formed when a Customer applies to use the Service in the manner specified
		by the Company and the Company accepts that application. The Company may refuse to enter into a
		Service Agreement if it has reasonable grounds to do so, including a previous breach by that
		Customer of an obligation under an agreement with the Company.
	</p>

	<h3>Article 1.5 (Subcontracting)</h3>
	<p>
		At its discretion, the Company may subcontract all or part of the work necessary to provide the
		Service to Customers and Users or to develop or maintain the Service or Software to a third
		party located in or outside Japan (a “Contractor”).
	</p>

	<h3>Article 1.6 (Preparation and Maintenance of Equipment)</h3>
	<ol>
		<li>
			Unless the Company agrees otherwise, the Customer shall, at its own expense and
			responsibility, install and configure the Hardware and LoRaWAN<sup class="reg">®</sup> base
			station in accordance with the conditions specified by the Company and maintain an environment
			in which the Service, including the Hardware and LoRaWAN<sup class="reg">®</sup> base station, can
			be used throughout the term of the Service Agreement.
		</li>
		<li>
			When necessary to use the Service, the Customer shall, at its own expense and responsibility,
			connect the LoRaWAN<sup class="reg">®</sup> base station to the internet using a telecommunications
			service provided by a telecommunications carrier or another provider.
		</li>
		<li>
			The Customer acknowledges that the Service may become unavailable if there is a defect in the
			LoRaWAN<sup class="reg">®</sup> connection, the Hardware, except during the warranty period under
			paragraph 9 of Article 6.1, the internet connection described in the preceding paragraph, or any
			other part of the environment required to use the Service, or if a security issue affects any of
			them. The Customer shall take adequate measures, including security measures, at its own expense
			and responsibility. The Company is not liable for the inability of a Customer or User to use the
			Service due to such a defect or security issue.
		</li>
	</ol>

	<hr />

	<h2>Chapter 2: Use of the Service</h2>

	<h3>Article 2.1 (Use of the Service)</h3>
	<ol>
		<li>
			Under the Service Agreement, the Company grants Customers and Users a limited,
			non-transferable license to use the Software.
		</li>
		<li>
			Customers and Users are authorized to use the Service only while complying with these Terms
			and the Service Agreement and only within the purposes of use specified in them. All rights,
			copyrights, and other Intellectual Property Rights in the Service belong to the Company or its
			licensors.
		</li>
		<li>
			Customers and Users may not transfer the right to use the Service to any third party and may
			not sublicense any right included in the Service to any third party unless expressly
			authorized in writing by the Company.
		</li>
	</ol>

	<h3>Article 2.2 (Account Management)</h3>
	<ol>
		<li>
			The Customer shall strictly manage the Login IDs and Passwords for User Accounts at its own
			responsibility and shall not lend them to third parties or use them in any other manner
			contrary to the purposes of use specified in these Terms.
		</li>
		<li>
			All use of the Service through a User Account’s Login ID and Password is deemed to be use by
			that User. The Customer is fully responsible for such use even if a third party uses the Login
			ID and Password without the User’s consent. If the Company suffers any loss due to the third
			party’s conduct, the Customer shall compensate the Company for that loss.
		</li>
		<li>
			If the Customer learns of, or believes there is a risk of, a breach of these Terms or the
			Service Agreement in connection with use of the Service through a User Account’s Login ID and
			Password, the Customer shall notify the Company immediately and bears full responsibility for
			the breach.
		</li>
	</ol>

	<h3>Article 2.3 (Fees)</h3>
	<ol>
		<li>
			Use of the Service is subject to fees. The Customer shall pay the fees specified by the
			Company (the “Service Fees”) in consideration for use of the Service. The Service Fees are
			governed by the conditions separately presented to the Customer by the Company.
		</li>
		<li>
			The method and timing of payment of the Service Fees and related matters are governed by the
			conditions separately presented to the Customer by the Company.
		</li>
	</ol>

	<h3>Article 2.4 (Term)</h3>
	<p>
		The term and renewal conditions of the Service Agreement are governed by the conditions
		separately presented to the Customer by the Company.
	</p>

	<hr />

	<h2>Chapter 3: Collection and Use of User Information</h2>

	<h3>Article 3.1 (Collection and Use of User Information)</h3>
	<ol>
		<li>
			Customers and Users agree that, when they use the Service, the Company may collect User
			Information through the Software or by other means, including the information listed below.
			User Information may include personal information as defined in the Act on the Protection of
			Personal Information (the “APPI”).
			<ol class="list-legal">
				<li>
					(1) Addresses, names, email addresses, and other information registered by Customers and
					Users when entering into a Service Agreement
				</li>
				<li>
					(2) Names, email addresses, and other information concerning the Customer’s Administrator
				</li>
				<li>
					(3) Names, email addresses, and other information registered during use by an individual
					who uses a User’s Login ID and Password and who appears to use the Service for a Customer
					or User, regardless of whether the relationship is one of employment, agency, or otherwise
				</li>
				<li>(4) Software usage history</li>
				<li>(5) Other information necessary for the Service to perform its functions</li>
			</ol>
		</li>
		<li>
			Customers and Users agree in advance that the Company and its Contractors may access, use, and
			manage User Information for the following purposes:
			<ol class="list-legal">
				<li>(1) Providing the Service and related services to Customers and Users</li>
				<li>(2) Performing maintenance, security measures, and related work</li>
				<li>(3) Providing after-sales service to Customers and Users</li>
				<li>(4) Developing, providing, maintaining, and otherwise supporting the Software</li>
				<li>
					(5) Improving after-sales service and other support systems for persons other than
					Customers and Users
				</li>
				<li>(6) Developing and improving the Company’s products and services</li>
				<li>(7) Creating and analyzing statistics and other Anonymized Data</li>
				<li>
					(8) Communicating between the Company and Customers or Users, including surveys and
					responses to inquiries
				</li>
				<li>(9) Preventing unauthorized use of the Service, including impersonation</li>
				<li>(10) Addressing disputes, litigation, and related matters</li>
				<li>
					(11) Carrying out the Company’s other business purposes, including, without limitation,
					development, design, engineering, production, sales, and the provision or improvement of
					the Service
				</li>
			</ol>
		</li>
		<li>
			Except as provided in the preceding paragraph, the Company shall obtain the consent of the
			Customer or User before providing User Information other than Anonymized Data to a third
			party. This requirement does not apply in the following cases:
			<ol class="list-legal">
				<li>
					(1) The Company reasonably determines that disclosure is required by law or regulation
				</li>
				<li>
					(2) Disclosure is necessary to protect a person’s life, body, or property, and the Company
					determines that obtaining the identifiable person’s consent is difficult
				</li>
				<li>
					(3) Disclosure is especially necessary to improve public health or promote the sound
					growth of children, and the Company determines that obtaining the identifiable person’s
					consent is difficult
				</li>
				<li>
					(4) Cooperation is necessary for a national government body, local government, or a person
					acting on its behalf to perform duties prescribed by law, and the Company determines that
					obtaining the identifiable person’s consent could impede the performance of those duties
				</li>
				<li>
					(5) A merger or another event changes the holder of rights in the Service or the operator
					of the Service, and the Company determines that transferring personal information is
					necessary to continue the Service
				</li>
			</ol>
		</li>
		<li>
			Customers and Users may provide User Information to a third party at their own responsibility
			and in compliance with the APPI and other applicable laws and regulations. The Company assumes
			no liability in connection with any such provision of User Information by a Customer or User.
			If the Company suffers any loss arising from or in connection with that disclosure, the
			Customer and User shall compensate the Company for that loss.
		</li>
		<li>
			When providing User Information through use of the Service, if the subject of the Service Data
			or the party that uses or possesses the Hardware is different from the Customer or User, the
			Customer and User shall provide that party with an adequate explanation of the collection of
			the information.
		</li>
		<li>
			If Customers or Users do not wish to transmit any User Information because it constitutes
			personal information, they may delete that information or ask the Company to delete it. They
			acknowledge that some functions of the Service may become unavailable if the information is
			not collected.
		</li>
	</ol>

	<h3>Article 3.2 (Protection of Personal Information)</h3>
	<ol>
		<li>
			The Company shall use personal information collected or received in connection with the
			Service only within the purposes stated in the preceding Article and shall provide it to third
			parties in accordance with that Article.
		</li>
		<li>
			The Company shall handle the personal information described in the preceding paragraph
			appropriately and in accordance with the Privacy Policy published on the Company’s website.
		</li>
	</ol>

	<h3>Article 3.3 (Consent of Interested Parties)</h3>
	<ol>
		<li>
			If User Information includes information concerning a third party, the Customer and User shall
			obtain that third party’s consent to the matters stated in Article 3.1 before providing the
			information to the Company.
		</li>
		<li>
			At the start of and throughout their use of the Service, Customers and Users warrant that they
			have obtained the consent described in the preceding paragraph, that they have lawful rights
			in the User Information, and that the uses of User Information listed in paragraph 2 of
			Article 3.1 do not infringe any third-party rights. Customers and Users shall address, at
			their own responsibility, any dispute with a third party arising from a breach of this
			warranty. The Company assumes no responsibility for such disputes.
		</li>
	</ol>

	<hr />

	<h2>Chapter 4: Collection and Management of Service Data</h2>

	<h3>Article 4.1 (Collection and Management of Service Data)</h3>
	<ol>
		<li>
			Customers and Users agree that Service Data will be transmitted to, stored on, and managed on
			cloud servers controlled by the Company. Service Data will be stored on those servers for the
			period specified in the Customer’s plan, up to a maximum of two years. The Company may delete
			Service Data from those servers after the applicable storage period expires.
		</li>
		<li>
			Customers and Users agree in advance that the Company may access, use, and manage Service Data
			for the following purposes:
			<ol class="list-legal">
				<li>(1) Providing the Service and related services to Customers and Users</li>
				<li>(2) Performing maintenance, security measures, and related work</li>
				<li>(3) Providing after-sales service to Customers and Users</li>
				<li>(4) Developing, maintaining, and otherwise supporting the Software</li>
				<li>(5) Creating and analyzing statistics</li>
				<li>(6) Preventing unauthorized use of the Service, including impersonation</li>
				<li>(7) Addressing disputes, litigation, and related matters</li>
			</ol>
		</li>
		<li>
			Customers and Users agree in advance that the Company may provide Anonymized Data to third
			parties.
		</li>
		<li>
			Except in the cases described in the preceding two paragraphs, the Company shall obtain the
			consent of the Customer and User before providing Service Data other than Anonymized Data to a
			third party. This requirement does not apply where the disclosure is required by law or
			regulation or requested by a competent public authority.
		</li>
		<li>
			Customers and Users may provide Service Data to a third party at their own responsibility and
			in compliance with the APPI and other applicable laws and regulations. The Company assumes no
			liability in connection with any such provision of Service Data by a Customer or User. If the
			Company suffers any loss arising from or in connection with that disclosure, the Customer and
			User shall compensate the Company for that loss.
		</li>
		<li>
			In connection with the Company’s access to, use of, or management of Service Data under
			paragraph 2 or a Customer’s or User’s provision of Service Data to a third party, if the
			subject of the Service Data or the party that uses or possesses the Hardware is different from
			the Customer or User, the Customer and User shall provide that party with an adequate
			explanation of the collection of the Service Data.
		</li>
	</ol>

	<h3>Article 4.2 (Consent of Interested Parties)</h3>
	<ol>
		<li>
			If Service Data includes information concerning a third party, the Customer and User shall
			obtain that third party’s consent to the matters stated in Article 4.1 before providing the
			information.
		</li>
		<li>
			At the start of and throughout their use of the Service, Customers and Users warrant that they
			have obtained the consent described in the preceding paragraph, that they have lawful rights
			in the Service Data, and that the Company’s uses of Service Data listed in paragraph 2 of
			Article 4.1 do not infringe any third-party rights. Customers and Users shall address, at
			their own responsibility, any dispute with a third party arising from a breach of this
			warranty. The Company assumes no responsibility for such disputes.
		</li>
	</ol>

	<hr />

	<h2>Chapter 5: Prohibited Conduct</h2>

	<h3>Article 5.1 (Prohibited Conduct)</h3>
	<p>
		Customers and Users shall not engage in any of the following conduct when using the Service. The
		Company may delete, at its discretion, information and data related to any of the following
		conduct.
	</p>
	<ol class="list-legal">
		<li>
			(1) Infringing, or being likely to infringe, any Intellectual Property Right or other right of
			the Company or a third party
		</li>
		<li>(2) Altering or deleting the content of the Service or information available through it</li>
		<li>
			(3) Cross-referencing Anonymized Data with other information to identify an individual or
			Customer to whom the Anonymized Data relates, identifying that person, or attempting either
			act
		</li>
		<li>
			(4) Modifying, reverse engineering, decompiling, or disassembling all or part of the Hardware
			or Software, creating derivative works from them, deciphering source code by any other means,
			or engaging in similar conduct
		</li>
		<li>(5) Using the Service for a purpose or by a method not specified in these Terms</li>
		<li>
			(6) Using the Service in a manner contrary to these Terms or the Service Agreement or in a
			manner that the Company determines to be inappropriate
		</li>
		<li>
			(7) Allowing a third party to use the Service in breach of these Terms or the Service
			Agreement
		</li>
		<li>(8) Using the Service while impersonating a third party</li>
		<li>(9) Violating any law or regulation or public order and morals</li>
		<li>
			(10) Discriminating against or defaming another person, or damaging another person’s honor or
			credit
		</li>
		<li>(11) Conduct connected, or likely to be connected, to a crime such as fraud</li>
		<li>
			(12) Registering images, documents, or other content that is obscene or constitutes child
			pornography or child abuse material
		</li>
		<li>(13) Establishing or soliciting participation in a pyramid scheme</li>
		<li>(14) Registering harmful data or computer programs, including computer viruses</li>
		<li>
			(15) Using the Service for advertising, publicity, or solicitation, or registering information
			with the Service that contains expressions that are, or are likely to be, offensive to a third
			party
		</li>
		<li>
			(16) Interfering, or being likely to interfere, with the provision or operation of the Service
		</li>
		<li>(17) Registering information for the purpose of meeting strangers</li>
		<li>
			(18) Posting a link in a manner or for a purpose that promotes conduct while knowing that the
			conduct falls within any of the preceding items
		</li>
		<li>(19) Any other conduct that the Company determines to be inappropriate</li>
	</ol>

	<hr />

	<h2>Chapter 6: Warranties and Liability</h2>

	<h3>Article 6.1 (Limitations of Warranties and Liability)</h3>
	<ol>
		<li>
			The Company provides the Service on an “as is” basis. If the Service or Software contains a
			defect, bug, or other fault, or if use of the Service is interrupted because of system
			overload, malfunction, or another cause, the Company is liable only to the extent provided in
			these Terms.
		</li>
		<li>
			When the Company considers it necessary, it may change the content of the Service or suspend
			or discontinue the Service at any time without notice to Customers or Users. If the Company
			suspends or discontinues the Service, it assumes no liability to Customers or Users except for
			settling recurring fees paid monthly or on another periodic basis.
		</li>
		<li>
			The Company makes no warranty concerning the completeness, usefulness, reliability,
			truthfulness, accuracy, reasonableness, operation, fitness for a particular purpose,
			compatibility with the equipment used, legality, non-infringement of third-party rights, or
			any other function or characteristic of the Service or Software. Customers and Users use the
			Service based on their own judgment and responsibility.
		</li>
		<li>
			The Company assumes no responsibility for disruptions caused by force majeure, including a
			failure or malfunction of Hardware or servers used for the Service, a power outage,
			communications-line failure, or system failure. In such a case, User Information, Service
			Data, or other data concerning a Customer or User may fail to be collected or may be lost.
			Customers and Users understand that if such data is lost, missing, delayed, or otherwise
			affected by such an event, use of the Hardware may be restricted or the Hardware may be reset.
			Customers and Users shall not hold the Company responsible for such loss or other effects.
		</li>
		<li>
			The Company shall take reasonable security measures consistent with industry standards to
			protect User Information and Service Data. Any loss caused by unauthorized access, theft,
			destruction, alteration, or similar conduct by a third party shall be resolved between the
			Customer or User and the third party that committed the conduct.
		</li>
		<li>
			The Company has no obligation to back up User Information or Service Data. Customers and Users
			shall regularly back up User Information and Service Data at their own responsibility.
		</li>
		<li>
			If a Customer or User connects an external storage device, such as a USB flash drive, to the
			Hardware and exports or writes data, or if the Hardware transmits data, the Company does not
			warrant that the external storage device or transmitted data is free of computer viruses and
			assumes no liability for any loss caused by such an infection.
		</li>
		<li>
			If, through an action by a Customer or User, the Service calls another application or other
			software provided by a third party or uses any function of such an application or software,
			the Company assumes no responsibility for the specifications, operation, functions, or other
			aspects of that application or software, or for its connection to or integration with the
			Service.
		</li>
		<li>
			The warranty for Company products included in the Hardware is governed by the warranty
			certificate or other document separately provided to the Customer by the Company.
		</li>
		<li>
			The warranty for products included in the Hardware that are not Company products is governed
			by the manufacturer’s warranty. The Company makes no warranty concerning the specifications,
			performance, precision, reproducibility, accuracy of measurements, or other characteristics of
			third-party Hardware and assumes no liability for any loss caused by defects, malfunctions,
			inaccurate data, or other issues involving third-party Hardware.
		</li>
		<li>
			Despite the preceding two paragraphs, measurements from sensors included in the Hardware,
			whether or not they are Company products, may be affected by the operating environment,
			conditions, deterioration over time, calibration status, and other factors. The Company
			assumes no liability for the completeness, usefulness, reliability, accuracy, or
			reasonableness of a sensor or its measurements, or for the results of a Customer’s decisions
			or actions based on them.
		</li>
	</ol>

	<h3>Article 6.2 (Response to Violations)</h3>
	<ol>
		<li>
			If the Company determines that conduct by a Customer or User violates these Terms or the
			Service Agreement, it may, without prior notice to that Customer or User, delete all or part
			of the User Information and Service Data, suspend or restrict use of the Service, or take any
			other measure it considers appropriate.
		</li>
		<li>
			The Company assumes no liability for any loss caused by a measure taken under the preceding
			paragraph.
		</li>
		<li>
			The preceding two paragraphs do not release Customers or Users from responsibility if the
			Company’s measure causes loss to the Company or a third party. If a Customer or User causes
			loss to a third party or creates a dispute with a third party by breaching these Terms or the
			Service Agreement, the Customer or User shall resolve the matter at its own responsibility and
			expense and shall not cause the Company to bear any liability. If another Customer, User, or
			third party seeks to hold the Company liable, the Customer and User shall resolve the dispute
			at their own responsibility and expense and shall not cause the Company to bear any liability.
		</li>
	</ol>

	<h3>Article 6.3 (Loss Caused by User Information or Other Data)</h3>
	<ol>
		<li>
			If User Information or Service Data interferes, or is likely to interfere, with the Service or
			the Company’s servers, the Company may, without obtaining prior consent from Customers or
			Users, itself or through a Contractor delete all or part of the User Information and Service
			Data or take any other measure it considers appropriate.
		</li>
		<li>
			The Company assumes no liability for any loss caused by a measure taken under the preceding
			paragraph.
		</li>
		<li>
			The preceding two paragraphs do not release Customers or Users from responsibility if the
			Company’s measure causes loss to the Company or a third party. Customers and Users shall not
			cause the Company to bear any liability for loss they incur as a result of that measure.
		</li>
	</ol>

	<h3>Article 6.4 (Compensation by the Company)</h3>
	<ol>
		<li>
			The Company is liable to compensate Customers and Users for loss arising in connection with
			the Service only if the Company is found to have acted intentionally or with gross negligence.
			The Company assumes no liability for loss arising from any of the following causes:
			<ol class="list-legal">
				<li>
					(1) Natural disasters such as earthquakes, tsunamis, lightning strikes, and floods;
					infectious diseases such as COVID-19, influenza, and avian influenza; war, including war
					outside Japan; revolution, riots, terrorism, and other civil disturbances; changes in laws
					or regulations affecting provision of the Service, particularly regulation concerning AI
					or personal information; accidents involving transportation services or communications
					lines; or other force majeure events
				</li>
				<li>
					(2) Damage caused by a person other than the Company to the Hardware, a LoRaWAN<sup
						class="reg">®</sup
					> base station, or other devices or equipment used for the Service (collectively, the “Service
					Equipment”)
				</li>
				<li>(3) An accident caused by equipment or devices other than the Service Equipment</li>
				<li>
					(4) A problem that occurs despite management in accordance with generally accepted
					technical standards at the time the Service Agreement was entered into, including a
					problem caused by a third-party attack on a server, a communications failure such as an
					internet outage, or a default by a server provider, including bankruptcy or equipment
					failure
				</li>
				<li>
					(5) Inappropriate AI training caused by errors, bias, or similar issues in information
					collected through the Hardware
				</li>
				<li>(6) Loss suffered by a third party other than a Customer or User</li>
				<li>(7) An accident or other event whose cause cannot be identified</li>
			</ol>
		</li>
		<li>
			The Company assumes no liability for matters that these Terms assign to the responsibility of
			a Customer or User or for matters that the Company does not warrant or for which it disclaims
			liability under these Terms.
		</li>
		<li>
			Despite paragraph 1, the Company’s liability is limited to ordinary loss directly suffered by
			a Customer or User. The Company is not liable for incidental, indirect, special, or future
			loss, or for lost profits. The maximum amount of compensation is the total Service Fees paid
			by the Customer to the Company during the preceding 12 months.
		</li>
	</ol>

	<hr />

	<h2>Chapter 7: Other Provisions</h2>

	<h3>Article 7.1 (Confidentiality)</h3>
	<ol>
		<li>
			Each Customer, User, and the Company shall use technical, commercial, or other business
			information learned about the other party in connection with the Service, excluding User
			Information (the “Confidential Information”), only for the purpose of using the Service and
			shall not disclose or divulge it to any third party without the other party’s prior written
			consent. For the Company, “third party” excludes its Contractors. Information that a receiving
			party can prove falls within any of the following categories is not Confidential Information:
			<ol class="list-legal">
				<li>
					(1) Information already held by the receiving party without an obligation of
					confidentiality
				</li>
				<li>
					(2) Information lawfully obtained from a third party without an obligation of
					confidentiality
				</li>
				<li>
					(3) Information developed independently without relying on information provided by the
					other party
				</li>
				<li>
					(4) Information that became public, before or after receipt, without a breach of these
					Terms or the Service Agreement
				</li>
			</ol>
		</li>
		<li>
			Despite the preceding paragraph, a Customer, User, or the Company may disclose Confidential
			Information that must be disclosed under applicable law or at the request of a competent
			public authority to the recipient required by law or to that authority. Unless prohibited by
			applicable law, the disclosing party shall notify the other party before disclosure. If prior
			notice is not possible, the disclosing party shall give notice promptly after disclosure.
		</li>
		<li>
			Despite paragraph 1, when the Company considers it necessary, it may disclose Confidential
			Information of a Customer or User to its Contractors to the extent necessary and without the
			Customer’s or User’s prior written consent, provided that the Company requires those
			Contractors to comply with the obligations stated in this Article.
		</li>
	</ol>

	<h3>Article 7.2 (Exclusion of Antisocial Forces)</h3>
	<ol>
		<li>
			In these Terms, “Antisocial Forces” means any person or organization that falls within any of
			the following categories:
			<ol class="list-legal">
				<li>
					(1) An organized crime group as defined in Article 2, item 2 of the Act on Prevention of
					Unjust Acts by Organized Crime Group Members, or an affiliated organization
				</li>
				<li>
					(2) A member of an organized crime group or affiliated organization described in the
					preceding item
				</li>
				<li>
					(3) An organization or individual such as a sokaiya (corporate extortionist), a person
					claiming to advocate a social movement or political activity while acting as a racketeer,
					or a crime group specializing in intellectual crime
				</li>
				<li>
					(4) In addition to the preceding categories, an organization or individual that pursues
					financial gain by making unjust demands using violence, force, threatening language, or
					fraudulent methods
				</li>
				<li>
					(5) An organization or individual that pursues financial gain by making unjust demands
					while suggesting a relationship with an organization, member, or individual described in
					any of the preceding categories
				</li>
			</ol>
		</li>
		<li>
			The Customer represents and warrants the following to the Company:
			<ol class="list-legal">
				<li>
					(1) Neither the Customer nor any person who uses the Service through a User Account’s
					Login ID and Password is an Antisocial Force
				</li>
				<li>
					(2) Neither the Customer nor any person who uses the Service through a User Account’s
					Login ID and Password has been an Antisocial Force
				</li>
				<li>(3) The Customer will not use Antisocial Forces</li>
				<li>
					(4) No director, executive officer, corporate officer, or other person substantially
					involved in management is an Antisocial Force or associates with Antisocial Forces
				</li>
				<li>
					(5) No major shareholder or investor is an Antisocial Force or associates with Antisocial
					Forces
				</li>
			</ol>
		</li>
		<li>
			If the Customer discovers that it has breached the preceding paragraph, it shall report that
			fact to the Company immediately.
		</li>
		<li>
			If the Customer breaches paragraph 2 or the preceding paragraph, or if there is a reasonable
			suspicion of such a breach, the Company may terminate the Service Agreement immediately
			without demand or other procedure and may seek compensation from the Customer for any
			resulting loss. If the Company terminates the Service Agreement under this paragraph, it is
			not liable to compensate the Customer or User for any loss caused by the termination.
		</li>
	</ol>

	<h3>Article 7.3 (Termination and Suspension of Use)</h3>
	<ol>
		<li>
			The Customer may terminate the Service Agreement by applying in the manner specified by the
			Company. The conditions of termination are governed by the conditions separately presented to
			the Customer by the Company.
		</li>
		<li>
			If a Customer or User breaches these Terms or the Service Agreement and fails to remedy the
			breach after the Company demands that it do so within a specified period, the Company may
			terminate all or part of the Service Agreement by written or email notice. The Company may
			also temporarily suspend the Customer’s or User’s use of the Service until the breach is
			remedied.
		</li>
		<li>
			If the Customer falls within any of the following categories, the Company may, without prior
			demand and by written or email notice to the Customer, temporarily suspend the Customer’s and
			Users’ use of the Service or terminate all or part of the Service Agreement:
			<ol class="list-legal">
				<li>(1) The Customer suspends payments or becomes unable to pay its debts</li>
				<li>(2) A bill or check is dishonored</li>
				<li>
					(3) A petition is filed for attachment, provisional attachment, or auction, or the
					Customer becomes subject to a disposition for delinquent taxes or public charges
				</li>
				<li>
					(4) A petition is filed to commence bankruptcy, corporate reorganization, or civil
					rehabilitation proceedings, or serious concern arises about the Customer’s
					creditworthiness
				</li>
				<li>
					(5) A supervisory authority revokes or suspends the Customer’s business license or imposes
					a similar disposition
				</li>
				<li>
					(6) The Customer adopts a resolution for dissolution, reduction of capital, or transfer of
					all or a material part of its business
				</li>
				<li>(7) An event similar to any of the preceding events occurs</li>
			</ol>
		</li>
		<li>
			The Company assumes no liability for any loss suffered by a Customer or User because the
			Company terminated the Service Agreement or suspended the Customer’s or User’s use of the
			Service under this Article.
		</li>
	</ol>

	<h3>Article 7.4 (Handling After the Agreement Ends)</h3>
	<ol>
		<li>Customers and Users may not use the Service after the Service Agreement ends.</li>
		<li>
			Customers and Users agree that, after the Service Agreement ends, the Company may delete at
			its discretion all User Information, Service Data, and other data or information provided to
			the Company by a Customer or User. Customers and Users shall, at their own responsibility and
			expense, make timely backups of all necessary data and information. The Company assumes no
			liability for loss of Customer or User data or information.
		</li>
		<li>
			If a Customer or User received any equipment or software from the Company for use of the
			Service, excluding Hardware purchased from the Company but including Hardware rented from the
			Company, the Customer or User shall return that equipment or software and all related
			materials, including copies of the software and materials, to the Company immediately after
			the Service Agreement ends.
		</li>
	</ol>

	<h3>Article 7.5 (Survival)</h3>
	<p>Articles 3.1 through 7.10 remain in effect after the Service Agreement ends.</p>

	<h3>Article 7.6 (Prohibition on Assignment)</h3>
	<p>
		Customers and Users may not assign to a third party all or part of their status under these
		Terms or the Service Agreement or any rights or obligations under these Terms or the Service
		Agreement without the Company’s prior written consent.
	</p>

	<h3>Article 7.7 (Severability)</h3>
	<p>
		Each provision of these Terms and the Service Agreement shall be interpreted so as to be valid
		to the fullest extent permitted by law. If any provision of these Terms or the Service Agreement
		is determined to be unlawful or unenforceable, that provision is invalid or unenforceable only
		to the extent of the illegality or unenforceability, without invalidating or making
		unenforceable the remainder of that provision or any other provision.
	</p>

	<h3>Article 7.8 (Exclusive Jurisdiction)</h3>
	<p>
		The Miyazaki District Court has exclusive jurisdiction as the court of first instance over any
		dispute between a Customer and the Company arising under these Terms or the Service Agreement.
	</p>

	<h3>7.9 (Governing Law)</h3>
	<p>
		The formation, validity, performance, and interpretation of these Terms and the Service
		Agreement are governed by the laws of Japan.
	</p>

	<h3>Article 7.10 (Good-Faith Consultation)</h3>
	<p>
		If a matter is not provided for in these Terms or the Service Agreement, or if any question
		arises concerning the interpretation of a provision, the parties shall resolve the matter
		through consultation in good faith.
	</p>

	<hr />

	<p class="legal-meta">Established and effective August 1, 2024</p>
	<p>Revised October 19, 2025</p>
	<p>Revised July 18, 2026</p>
</article>
