import React, { useRef } from "react";
import "./releaseCert.css";
import { pdfjs } from "react-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Configure react-pdf to avoid warnings about missing Worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReleaseCertificate = () => {
  const tableRef = useRef(null);

  const downloadPDF = () => {
    const input = tableRef.current;
    if (!input) return;

    const dpi = 350;

    html2canvas(input, { scale: dpi / 96 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
        precision: dpi / 25.4,
      });

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("table.pdf");
    });
  };

  async function generatePDF() {
    const elementToPrint = document.getElementById("body");
    const dpi = 350;
    const canvas = await html2canvas(elementToPrint, { scale: dpi / 96 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      precision: dpi / 25.4,
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );
    pdf.save("table.pdf");
  }
  async function generatePDF1() {
    const firstElementToPrint = document.getElementById("body");
    const secondElementToPrint = document.getElementById("body2");

    const dpi = 350;

    const canvas1 = await html2canvas(firstElementToPrint, { scale: dpi / 96 });
    const imgData1 = canvas1.toDataURL("image/png");

    const canvas2 = await html2canvas(secondElementToPrint, {
      scale: dpi / 96,
    });
    const imgData2 = canvas2.toDataURL("image/png");

    const pdf = new jsPDF({
      precision: dpi / 25.4,
    });

    pdf.addImage(
      imgData1,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );

    pdf.addPage();
    pdf.addImage(
      imgData2,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );

    pdf.save("two_pages.pdf");
  }

  return (
    <>
      <div className="contain" ref={tableRef}>
        <div id="body">
          <table
            // ref={tableRef}
            cellSpacing={0}
            cellPadding={0}
            style={{
              width: "728px",
              borderCollapse: "collapse",
              // position: "relative",
            }}
          >
            <tbody>
              <tr style={{ height: "50px" }}>
                <td colSpan={6} className="td-1">
                  <p className="heading">
                    <strong>
                      Erlaubnisschein für feuergefährliche Arbeiten{" "}
                    </strong>
                  </p>
                  <p className="fp-line">
                    <span>wie</span>

                    <input type="checkbox" name="" />
                    <span>
                      Schweißen, Schneiden und verwandte Verfahren
                      (Schweißerlaubnis)
                    </span>

                    <span>
                      lfd. Nummer: &nbsp;&nbsp;<u>1234567890</u>
                    </span>
                  </p>
                  <p className="sp-line">
                    <input type="checkbox" name="" />
                    <span> Trennschleifen </span>
                    <input type="checkbox" name="" />
                    <span> Löten </span>
                    <input type="checkbox" name="" />
                    <span> Auftauen </span>
                    <input type="checkbox" name="" />
                    <span> Heißklebearbeiten </span>
                    <input type="checkbox" name="" />{" "}
                    <span>
                      &nbsp;&nbsp;<u>Some Dummy Text</u>
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="td-2">
                  <p className="ip-1">
                    <strong>1</strong>
                  </p>
                </td>
                <td
                  style={{
                    width: "100px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    <strong>Arbeitsort/-stelle</strong>
                  </p>
                </td>
                <td className="td-value" colSpan={4}>
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="td-value"></td>
                <td className="title-td">
                  <p className="title-p">
                    <span>Brand-/explosions-gefährdeter Bereich</span>
                  </p>
                </td>
                <td className="td-value" colSpan={4}>
                  <p className="p-value">
                    Räumliche Ausdehnung um die Arbeitsstelle:
                  </p>
                  <p className="p-value">
                    Umkreis (Radius) von ..............m, Höhe von
                    ............m, Tiefe von..............m
                  </p>
                </td>
              </tr>
              <tr>
                <td className="td-value">
                  <p className="ip-1">
                    <strong>2 </strong>
                  </p>
                </td>
                <td className="title-td">
                  <p className="title-p">
                    <strong>Arbeitsauftrag </strong>
                    <br />
                    <span style={{ fontSize: "7px" }}>
                      (z.B. Träger abtrennen
                    </span>
                    <br />
                    <p style={{ fontSize: "9px" }}>Arbeitsverfahren</p>
                  </p>
                </td>
                <td className="td-value" colSpan={2}>
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                </td>
                <td colSpan={2} className="td-value">
                  <p className="p-value">Auszuführen von (Name):</p>
                </td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td className="td-value">
                  <p
                    style={{
                      marginTop: "0pt",

                      marginBottom: "0pt",
                      fontSize: "9pt",
                    }}
                  >
                    <strong>3 </strong>
                  </p>
                </td>
                <td className="td-value" colSpan={5}>
                  <p className="ip-1">
                    <strong>Sicherheitsmaßnahmen bei Brandgefahr </strong>
                  </p>
                </td>
              </tr>
              <tr style={{ height: "150px" }}>
                <td className="td-value">
                  <p className="ip-1">3a</p>
                </td>
                <td className="title-td">
                  <p className="ip-1">Beseitigung der Brandgefahr</p>
                </td>
                <td className="td-value" colSpan={3}>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Entfernen beweglicher brennbarer Stoffe und Gegenstände –
                      ggf. auch
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staubablagerungen
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Entfernen von Wand- und Deckenverkleidungen, soweit sie
                      brennbare
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Stoffe abdecken
                    oder verdecken oder selbst brennbar sind
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Abdecken ortsfester brennbarer Stoffe und Gegenstände
                      (z.B.
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Holzbalken,
                    -wände, -fußöden, -gegenstände, Kunststoffteile) mit
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; geeigneten
                    Mitteln und ggf. deren Anfeuchten
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Abdichten von Öffnungen (z.B. Fugen, Ritzen,
                      Mauerdurchbrüchen,
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rohröffnungen,
                    Rinnen, Kamine, Schächte zu benachbarten Bereichen
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mittels Lehm,
                    Gips, Mörtel, feuchte Erde usw.)
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      &nbsp;&nbsp;<u>Some Dummy Text</u>
                    </span>
                  </p>
                </td>
                <td className="td-value">
                  <p className="p-value">Name:</p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">Ausgeführt:</p>
                  <br />
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">(Unterschrift)</p>
                </td>
              </tr>
              <tr style={{ height: "120px" }}>
                <td className="td-value">
                  <p className="ip-1">3b</p>
                </td>
                <td className="title-td">
                  <p className="title-p">Bereitstellung von</p>
                  <p className="title-p">Löschmitteln</p>
                </td>
                <td colSpan={3} className="td-value">
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> Feuerlöscher mit</span>
                    <span>&nbsp;&nbsp; </span>
                    <input type="checkbox" name="" />
                    <span> Wasser</span>
                    <span>&nbsp;&nbsp;&nbsp; </span>
                    <input type="checkbox" name="" />
                    <span> Pulver</span>
                    <span>&nbsp;&nbsp;&nbsp; </span>
                    <input type="checkbox" name="" />
                    <span> CO</span>
                    <span>
                      <sub>2</sub>
                    </span>
                    <span>
                      <sub>&nbsp;&nbsp;&nbsp;&nbsp; </sub>
                    </span>
                    <input type="checkbox" name="" />{" "}
                    <span>
                      {" "}
                      <sub>
                        &nbsp;&nbsp;<u> Some Dummy Text</u>
                      </sub>
                    </span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> Löschdecken</span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> angeschlossener Wasserschlauch</span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> wassergefüllter Eimer </span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> Benachrichtigen der Feuerwehr </span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      &nbsp;&nbsp;<u>Some Dummy Text</u>
                    </span>
                    <span> </span>
                  </p>
                </td>
                <td className="td-value">
                  <p className="p-value">Name:</p>
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">Ausgeführt:</p>
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">(Unterschrift)</p>
                </td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td className="td-value">
                  <p className="ip-1">3c</p>
                </td>
                <td className="title-td">
                  <p className="ip-1">Brandposten</p>
                </td>
                <td colSpan={4} className="td-value">
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> während der feuergefährlichen Arbeiten </span>
                  </p>
                  <p className="p-value" style={{ float: "right" }}>
                    Name:&nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="td-value">
                  <p className="p-value">3d</p>
                </td>
                <td className="title-td">
                  <p className="p-value">Brandwache</p>
                </td>
                <td className="td-value" colSpan={4}>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> nach Abschluss der feuergefährlichen Arbeiten </span>
                  </p>
                  <p className="p-value" style={{ display: "flex" }}>
                    Dauer:&nbsp;&nbsp;<u>Some Dummy Text</u> Stunde/n:{" "}
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <span className="p-value" style={{ float: "right" }}>
                    Name: &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="body2">
          <table
            // ref={tableRef}
            cellSpacing={0}
            cellPadding={0}
            style={{
              width: "700px",
              borderCollapse: "collapse",
              // position: "relative",
            }}
          >
            <tbody>
              <tr style={{ height: "12.5pt" }}>
                <td className="td-value">
                  <p className="ip-1">
                    <strong>4 </strong>
                  </p>
                </td>
                <td colSpan={5} className="td-value">
                  <p className="p-value">
                    <strong>Sicherheitsmaßnahmen bei Explosionsgefahr </strong>
                  </p>
                </td>
              </tr>
              <tr style={{ height: "150px" }}>
                <td className="td-value">
                  <p className="ip-1">4a</p>
                </td>
                <td className="title-td">
                  <p className="ip-1">Beseitigung der</p>
                  <p className="p-value">Explosionsgefahr</p>
                </td>
                <td colSpan={3} className="td-value">
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Entfernen sämtlicher explosionsfähiger Stoffe und
                      Gegenstände auch
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staubablagerungen
                    und Behälter mit gefährlichem Inhalt oder mit dessen
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Resten
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span> Explosionsgefahr in Rohrleitungen beseitigen</span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Abdichten von ortsfesten Behältern, Apparaten oder
                      Rohrleitungen, die
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; brennbare
                    Flüssigkeiten, Gase oder Stäube enthalten oder enthalten
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; haben, ggf. in
                    Verbindung mit lufttechnischen Maßnahmen
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Durchführen lufttechnischer Maßnahmen nach EX-RL in
                      Verbindung mit
                    </span>
                  </p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; messtechnischer
                    Überwachung
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Aufstellen von Gaswarngeräten für &nbsp;&nbsp;
                      <u>Some Dummy Text</u>
                    </span>
                  </p>
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      &nbsp;&nbsp;<u>Some Dummy Text</u>
                    </span>
                  </p>
                </td>
                <td className="td-value">
                  <p className="p-value">Name:</p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">Ausgeführt:</p>

                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">(Unterschrift)</p>
                </td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td className="td-value">
                  <p className="ip-1">4b</p>
                </td>
                <td className="title-td">
                  <p className="ip-1">Überwachung</p>
                </td>
                <td colSpan={4} className="td-value">
                  <p className="p-value">
                    <input type="checkbox" name="" />
                    <span>
                      {" "}
                      Überwachen der Sicherheitsmaßnahmen auf Wirksamkeit{" "}
                    </span>
                  </p>
                  <p className="p-value" style={{ float: "right" }}>
                    Name: &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                </td>
              </tr>
              <tr style={{ height: "25px" }}>
                <td className="td-value">
                  <p className="ip-1">4c</p>
                </td>
                <td className="title-td">
                  <p className="ip-1">Aufhebung der Sicherheitsmaßnahmen</p>
                </td>
                <td colSpan={4} className="td-value">
                  <p className="p-value">
                    nach Abschluss der feuergefährlichen Arbeiten
                  </p>
                  <p className="p-value">
                    nach: &nbsp;&nbsp;<u>Some Dummy Text</u> Stunde/n{" "}
                    <span style={{ float: "right" }}>
                      Name: &nbsp;&nbsp;<u>Some Dummy Text</u>
                    </span>
                  </p>
                </td>
              </tr>
              <tr style={{ height: "60px" }}>
                <td className="td-value">
                  <p className="ip-1">
                    <strong>5 </strong>
                  </p>
                </td>
                <td className="title-td">
                  <p className="ip-1">
                    <strong>Alarmierung</strong>
                    <span> </span>
                  </p>
                </td>
                <td colSpan={4} className="td-value">
                  <p className="p-value">Standort des nächstgelegenen</p>
                  <p className="p-value">
                    Brandmelders. &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <p className="p-value">
                    Telefons:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <p className="p-value">
                    Feuerwehr Ruf-Nr. &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                </td>
              </tr>
              <tr style={{ height: "60px" }}>
                <td className="td-value">
                  <p className="ip-1">
                    <strong>6</strong>
                  </p>
                </td>
                <td className="title-td">
                  <p className="ip-1">Auftraggebender</p>
                  <p className="ip-1">Unternehmer (Auftraggeber)</p>
                  <br />
                  <br />
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <p className="p-value">Datum</p>
                </td>
                <td colSpan={4} className="td-value">
                  <p className="p-value">
                    Die Maßnahmen nach 3 und 4 tragen den durch die örtlichen
                    Verhältnisse entstehenden Gefahren Rechnung.
                  </p>
                  <p className="p-value">&nbsp;</p>
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <br />
                  <p className="p-value">
                    Unterschrift des Betriebsleiters oder dessen Beauftragten
                    nach § 8 Abs. 2 ArbSchG
                  </p>
                </td>
              </tr>
              <tr style={{ height: "60px" }}>
                <td className="td-value">
                  <p className="ip-1">
                    <strong>7</strong>
                  </p>
                </td>
                <td colSpan={1} className="td-value">
                  <p className="ip-1">Ausführender Unternehmer</p>
                  <p className="ip-1">(Auftragnehmer)</p>
                  <br />
                  <p className="ip-1">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <p className="ip-1">Datum</p>
                </td>
                <td colSpan={3} className="td-value">
                  <p className="p-value">
                    Die Arbeiten nach 2 dürfen erst begonnen werden, wenn die
                    Sicherheitsmaßnahmen nach 3a-3c und/oder 4a, 4b durchgeführt
                    sind
                  </p>
                  <p className="p-value">&nbsp;</p>
                  <p className="p-value">
                    &nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <p className="p-value">
                    Unterschrift des Unternehmers oder seines Beauftragten
                  </p>
                </td>
                <td className="td-value">
                  <p className="p-value">Kenntnisnahme des</p>
                  <p className="p-value">Ausführenden nach 2</p>
                  <p className="p-value">
                    &nbsp;&nbsp;&nbsp;<u>Some Dummy Text</u>
                  </p>
                  <p className="p-value">Unterschrift</p>
                </td>
              </tr>
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <p className="p-value" style={{ fontSize: "8px" }}>
                    <strong>
                      <span>Original </span>
                    </strong>
                    <span>z.Hd. des Ausführenden</span>
                    <strong>
                      <span>1. Durchschlag</span>
                    </strong>
                    <span>für den Auftraggeber</span>
                    <strong>
                      <span>2. Durchschlag</span>
                    </strong>
                    <span>für den Auftragnehmer</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <button
          className="btn cmn_yellow_bg"
          // style={{ position: "absolute", right: "50px", top: "50px" }}
          onClick={downloadPDF}
        >
          Download PDF ref
        </button>
        <button className="btn cmn_yellow_bg" onClick={generatePDF}>
          Download PDF
        </button> */}
        <button className="btn cmn_yellow_bg" onClick={generatePDF1}>
          Download PDF1
        </button>
      </div>
    </>
  );
};

export default ReleaseCertificate;
