// Sensirion's own calibration documents, linked from every claim about sensor
// calibration on the site. Keep each claim scoped to what its document says:
//   - SHT43: individual 3-point temperature calibration (-30 / 5 / 70 °C) by
//     Sensirion's ISO/IEC 17025:2017 accredited lab (SAS SCS 0158); a
//     serial-number-specific certificate is downloadable from Libellus.
//     Temperature only, not humidity.
//   - SHT40 / SCD41: factory calibrated and individually tested. The published
//     declarations are common to the whole product series, not per-unit
//     accredited certificates (the SCD4x one cites ISO 9001 for its reference).
// Checked 2026-10-31. Sensirion bumps datasheet versions in the URL, so re-check
// these when one stops resolving.

/** SHT4x datasheet v7.3 (June 2026), section 2.4 starts on PDF page 8. */
export const SHT4X_DATASHEET_CAL =
	'https://sensirion.com/media/documents/33FD6951/6A7C10A0/HT_DS_Datasheet_SHT4x_V7.3.pdf#page=8';

/** Libellus: Sensirion's portal for per-unit / per-reel SHT43 certificates. */
export const LIBELLUS = 'https://libellus.sensirion.com/';

/** "Calibration Certification" for SHT2x/3x/4x/... (26 Aug 2021), common to the series. */
export const SHT_CAL_DECLARATION =
	'https://sensirion.com/media/documents/91BA82E8/616405D3/Sensirion_Humidity_Sensors_SHTxx_Calibration_Certification.pdf';

/** "Calibration Certification" for SCD4x (16 May 2022), common to the series. */
export const SCD4X_CAL_DECLARATION =
	'https://sensirion.com/media/documents/42FA3069/62860E63/CalibrationCertification_SCD4.pdf';
