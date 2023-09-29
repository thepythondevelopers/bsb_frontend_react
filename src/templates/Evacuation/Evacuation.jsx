
import '../Evacuation/style.css';
const API = process.env.REACT_APP_API_BASE_URL;

const Evacuation_template = (props) => {
    console.log("data from props::",props.data);
    return (
        <>
            <div class="body">
	<table width="100%" className="table1" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="80%"
				className="tr1">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" className="th1">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
						<th class="column" width="" className="th2">
							Date:
						</th>
					</tr>
					<tr>
						<td colspan="2">
							<h2 class="main-head">Prologue</h2>
							<p>Diese Brandschutzordnung enthält Regeln für die Brandverhütung und Anweisungen über
								das Verhalten und die Maßnahmen bei Ausbruch eines Brandes. Die nachfolgenden
								Regelungen dienen dem vorbeugenden Brandschutz im Gebäude. Die Brandschutzordnung
								entbindet nicht von der Verpflichtung, sonstige Arbeitsschutz- und
								Unfallverhütungsvorschriften zu beachten und einzuhalten.
							</p>
							<p>
								Die Brandschutzordnung besteht aus 3 Teilen:
							</p>
							<p>
								Teil A (Aushang) richtet sich an alle Personen, die sich (auch nur vorrübergehend)
								im Gebäude und auf dem Gelände aufhalten.
							</p>
							<p>
								Teil B (für Personen ohne besondere Brandschutzaufgaben) richtet sich an
								Personen, die sich nicht nur vorübergehend im Gebäude aufhalten.Inhalt von Teil B der
								Brandschutzordnung sind die betrieblichen und organisatorischen Maßnahmen zur
								Brandverhütung und die Hinweise zum richtigen Verhalten im Gefahrenfall. Teil B ist
								einmal jährlich zu unterweisen. Die Unterweisung ist zu dokumentieren.
							</p>
							<p>
								Teil C (für Personen mit besonderen Brandschutzaufgaben) richtet sich an
								Personen, denen über ihre allgemeinen Pflichten hinaus besondere Aufgaben im
								Brandschutz übertragen wurden.
							</p>
						</td>
					</tr>
				</table>
			</td>
			<td className="td1" class="column-top" width="20%" bgcolor="#ff8200">
				<div class="verti">
					<h1 className="h1">Brandschutzordnung</h1>
				    <h3 className="h3">Teil B nach DIN 14096</h3>
			    </div>
			</td>


		</tr>

	</table>
	<table width="100%" className="table2" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="100%" colspan="2"
				className="td3">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" width="" className="th3">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
					</tr>
					<tr>
						<td>
							<p><i className="p1">Variousevents such asfires, leakageofhazardoussubstances, accidents, etc. 
cantrigger an alarmwith subsequent evacuationof a company. In principle, 
all affectedpersonsmustthenbeevacuatedimmediately and 
safelyfromtheendangeredarea.</i>

							</p>
							<p>The scope and time intervalsoftheevacuationdrillweredetermined via a riskassessment. The effectivenessoftheevacuation alert signalstoemployeesmustbedeterminedthroughperiodictesting.</p>
							<p>   An evacuationdrillis an exercise in whichparticipantslearnhowtoact in theeventof an emergencysituation, such as a fireorotherhazardthatrequiresthemtoleavethebuilding. The exercisecanbeconducted in a real orsimulatedbuilding and usuallyinvolvesperformingevacuationprocedures and training in theuseofemergencyexits and othersafetyequipment. </p>
							<p>Conductingevacuationdrillsisimportanttoensurethateveryone in thebuildingcanbeevacuatedquickly and safely in theeventof an emergencysituation.  After thebuildingorareashavebeeninspected, theexerciseleaderdeclarestheendoftheexercise at theassemblypoint. Subsequently, a follow-upistobecarried out and recorded. The employeesaretobeinformedpromptlyaboutthefindingsfromtheevacuationexercises, e.g. intranet, noticeboard, departmentalmeeting, staffmeeting, etc. 

							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table width="100%" className="table3" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="100%" colspan="2"
				className="td4">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" width="" className="th4">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
					</tr>
					<tr>
						<td>
							<h2 class="main-head h4">Inhalt</h2>
							<ul>
								<li>PROLOGUE_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
									_ _ _ _ _ __ _ _ _ _1</li>
								<li>1) ALLGEMEIN_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
									_ _ _ _ _ _ _ _ _ _3</li>
								<li>2) ABLAUF_ _ _ _ _ _ _ _ _ _ _
									_ _ _ _ _ _ _ _ _ _ 4</li>
								<li>3) RÄUMUNGSABLAUF UND /-ZEITEN	_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
									_ _ _ _ _ _ _ _ _ _ 4</li>
								<li>4) ERGEBNISSE UND BEWERTUNG_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
									_ _ _ _ _ _ _ _ _ _4</li>
								
							</ul>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table width="100%" className="table4" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="100%" colspan="2"
				className="td5">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" width="" className="th5">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
					</tr>
					<tr>
						<td>
							<h2 class="main-head">1) General</h2> 
                          <table width="100%" className="table5" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td><strong>Date:</strong></td>
			<td>24.11.2022</td>
		</tr>
		<tr>
			<td><strong>Start oftheexercise:</strong></td>
			<td>10:08 <span className="time_unit">Uhr</span></td>
		</tr>
		<tr>
			<td><strong>Assumedsituation:</strong></td>
			<td>Auslösen eines Druckknopfmelders im 1. OG</td>
		</tr>
		<tr>
			<td><strong>Location:	</strong></td>
			<td>Bär AG<br/>
Am Cargolift 24<br/>
54863 Füssen
</td>
		</tr>
		<tr>
			<td><strong>Employees:	</strong></td>
			<td>248 </td>
		</tr>
		<tr>
			<td><strong>Evacuationhelper:</strong></td>
			<td>Ausgebildet (2023)</td>
		</tr>
		<tr>
			<td><strong>Firealarmsystem:</strong></td>
			<td>Ja</td>
		</tr>
		<tr>
			<td><strong>Evacuationdrill:</strong></td>
			<td>Unangekündigt</td>
		</tr>
		<tr>
			<td><strong>Exercise smoke:</strong></td>
			<td>Nein</td>
		</tr>
		<tr>
			<td><strong>Exercise Observer:</strong></td>
			<td>3</td>
		</tr>
		<tr>
			<td><strong>Competences:</strong></td>
			<td>Herr Gagliardi, Rosario		- Fachkraft für Arbeitssicherheit<br/>
				Herr Belz, Rolf			- Sicherheitsfachkraft<br/>
				Herr Goldschmidt, Christian	- Brandschutzbeauftragter<br/>	

</td>
		</tr>
		<tr>
			<td><strong>fffff</strong></td>
			<td>fffff</td>
		</tr>
	</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
    <table width="100%" className="table4" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="100%" colspan="2"
				className="td5">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" width="" className="th5">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
					</tr>
					<tr>
						<td>
							<h2 class="main-head">2) Procedure</h2> 
                          <table width="100%" className="table5" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td className='emp_in_bl'><strong>Employees in building:</strong></td>
			<td>Nein</td>
		</tr>
		<tr>
			<td><strong>Fire department:</strong></td>
			<td>Ja</td>
		</tr>
		<tr>
			<td><strong>Police:</strong></td>
			<td>Nein</td>
		</tr>
		<tr>
			<td><strong>Meeting of the operational task force:</strong></td>
			<td>In accordance with the evacuation concept, the command center was located in the area of the fire alarm system. There, feedback was received from the evacuation assistants regarding the evacuation status.
</td>
		</tr>
	</table>
    
    
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
    <table width="100%" className="table4" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="100%" colspan="2"
				className="td5">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" width="" className="th5">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
					</tr>
					<tr>
						<td>
							<h2 class="main-head">3) Evacuation procedure and / times</h2> 
                            <h4>Evacuation time</h4>
                          <table width="100%" className="table5" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td className='emp_in_bl'><strong>Start of the evacuation drill:</strong></td>
			<td><span id="soed">10:08</span> <span className="time_unit">Uhr</span></td>
		</tr>
		<tr>
			<td><strong>Detection Damage Event:</strong></td>
			<td><span id="dde">10:08</span> <span className="time_unit">Uhr</span></td>
		</tr>
		<tr>
			<td><strong>Initial Feedback Fire Prevention Worker:</strong></td>
			<td><span id="iffpw">10:09</span> <span className="time_unit">Uhr</span></td>
		</tr>
		<tr>
			<td><strong>Arrival at the assembly point by:</strong></td>
			<td><span id="aatapb">10:12</span> <span className="time_unit">Uhr</span>
</td>
		</tr>
        <tr>
			<td><strong>End of the evacuation drill:</strong></td>
			<td><span id="eofted">10:15</span> <span className="time_unit">Uhr</span></td>
		</tr>
        <tr>
			<td><strong>Way to the assembly point:</strong></td>
			<td><span id="wttap">2</span> <span className="time_unit">Minuten</span></td>
		</tr>
        <tr>
			<td><strong>Gesamtzeitbedarf:</strong></td>
			<td><span id="ges">7</span> <span className="time_unit">Minuten*</span></td>
		</tr>
	</table>
    <p class="comp_cleared">*The building was <span id="cc">4</span> <span className="time_unit">min</span> completely cleared after the alarm.</p>
    
    
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
    <table width="100%" className="table4" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td class="column-top" width="100%" colspan="2"
				className="td5">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th class="column" width="" className="th5">
							<img src="/assets/images/template-logo.png" width="131" height="64" border="0" alt="" />
						</th>
					</tr>
					<tr>
						<td>
							<h2 class="main-head">4) Ergebnisse und Bewertung</h2> 
                            <p>Info: After the exercise, a debriefing was held with all persons involved in the exercise with special tasks in case of evacuation.</p>
                            <div className='block2'>
                            <p className='sod'>Summary of deficiencies:</p>
                            <p>1.	Lautstärke Alarmierungssignal</p>
                            <p>2.	Sammelplatz nicht auf der anderen Straßenseite</p>
                            </div>
                            <p className='desc'>Description:</p>
                            <h3 class="heading1">Zu 1:	Lautstärke Alarmierungssignal</h3>
                            <p className='desc2'>Die Lautstärke im gesamten Lager-/ und Produktionsbereich war offensichtlich zu leise.</p>
                            <h3 className='heading2'>Empfehlung:</h3>
                            <p>Der Schalldruckpegel der Alarmgeber muss mindestens 65 dB betragen.</p>
                            <p>Weiter muss das Signal der Alarmierungseinrichtungen sich von betrieblichen Signalen unterscheiden und den allgemeinen Geräuschpegel (Störpegel) jederzeit 10dB(A) übersteigen, jedoch nach DIN 7731 nicht über 118dB(A) laut sein.</p>
                            <p className='last_para'>Die Lautstärke des Alarmierungssignal ist durch die Fachfirma der Brandmeldeanlage zu prüfen und entsprechend den Vorgaben, der DIN 14675 in Verbindung mit DIN VDE 0833, anzupassen</p>
                            <strong className='signature'>Verantwortlich: Gerd Bär GmbH</strong>
                            <h3 class="heading3">Zu 2:	Sammelplatz nicht auf der anderen Straßenseite</h3>
                            <p>Die meisten Mitarbeiter überquerten die Pfaffenstraße und sammelten sich auf der gegenüberliegenden Straßenseite.</p>
                            <h3  className='heading2'>Empfehlung:</h3>
                            <p>Das Überqueren der Straße im Räumungsfall birgt ein unnötiges Risiko, welches vermieden werden muss. Zudem ist eine saubere Kommunikation, über die Straße hinweg, zwischen Einsatzleitung und Mitarbeitern nicht möglich. Der offizielle Sammelplatz befindet sich unmittelbar vor dem Gebäude. Hierfür kann der gesamte Parkraum ausgenutzt werden. Ausschließlich die Fahrstraße muss als Bewegungsfläche für die Einsatzfahrzeuge der Feuerwehr freigehalten werden.</p>
                            <p className='last_para'>Dieser Punkt ist mit in die jährliche Sicherheitsunterweisung aufzunehmen.</p>
                            <strong className='signature'>Verantwortlich: Gerd Bär GmbH</strong>
                        </td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>
        </>
    )
};

export default Evacuation_template;