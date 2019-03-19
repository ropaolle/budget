import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function Om(props) {
  const { user } = props;

  return (
    <div className="page">
      <Container>
        <h1>Om</h1>

        <h5>Version 0.0.11 (2019-01-11)</h5>
        <ul>
          <li>Eriks veckorapport</li>
          <ul>
            <li>
              <Link to="veckorapport">Veckorapporten</Link> genererar en tabell med arbetstid per vecka per användare.
              Tabellen sammanställer debiteringstyperna <code>Standard</code>, <code>Supportavtal</code>,{' '}
              <code>Personlig tekniker</code>, <code>Ingen debitering</code>, <code>Hjälpa kollega</code> varav{' '}
              <code>Ingen debitering</code> och <code>Hjälpa kollega</code> har slagits ihop under prosten ingen
              debitering.
            </li>
            <li>
              Tabellen kan även exporteras till Excel. Alla tider exporteras då i minuter och summeringar har
              utelämnats.
            </li>
          </ul>
        </ul>

        <h5>Version 0.0.10 (2019-01-09)</h5>
        <ul>
          <li>Mina tider</li>
          <ul>
            <li>
              <Link to="tider">Mina tider</Link> visas en översikt med alla tider för ticketar och ärenden som är
              registrerad på mig. Urvalet är baserat på person och datum intervall. Listan grupperas per dag och visar
              alla enskilda ticketar och ärenden.
            </li>
            <li>Varje enskild ticket och ärende länkar till en sida med alla inkluderade tider.</li>
          </ul>

          <li>Wallboard</li>
          <ul>
            <li>
              <Link to="wallboard">Wallboard:en</Link> ger en översikt över respektive persons faktureringsstatus för
              arbetat tid och en sammanställning av all personals tider.
            </li>
            <li>Färgkodning: Grönt fakturerbar tid, rött ej fakturerbar tid.</li>
            <li>
              Användare: 100 procent representerar en full arbetsdag, dvs. 8 timmar. Arbetstid är summan av dagens
              arbetstid (tt:mm).
            </li>
            <li>
              Alla användare (total tid): Visar en summering av alla användares dagliga arbetstid. 100 procent
              representerar antal användare som har registrerade tider multiplicerat med 8 timmar.
            </li>
          </ul>
        </ul>

        <h5>Version 0.0.9 (2019-01-07)</h5>
        <ul>
          <li>
            Projektsida med enklare projekthantering.
            <ul>
              <li>
                Ett projekt som kan innehålla valfritt antal delprojekt, vilka i sin tur kan innehålla valfritt antal
                ärenden/ticketar.
              </li>
              <li>
                Om kund/organisation definieras för projekt används automatiskt samma kund för alla delprojekt och
                ärenden. Ticketar får dock kund/organisation via osTicket.
              </li>
              <li>Stängda projekt tillåter inte nya delprojekt, ärenden eller ticketar.</li>
              <li>Projekt, delprojekt, ärenden eller ticketar som innehåller poster kan inte raderas.</li>
              <li>
                Tider och kostnader som inte har faktureringstatus <code>ej fakturerad</code> är låsta och kan inte
                raderas.
              </li>
              <li>Delprojekt, ärenden och ticketar kan flyttas till andra projekt respektive ärende/ ticket.</li>
              <li>Tider och kostnader kan inte flyttas.</li>
            </ul>
          </li>

          <li>
            Status (progress bar)
            <ul>
              <li>
                Status för projekt baseras på summan av estimerad tid i samtliga delprojekt och registrerad tid för alla
                ärenden och ticketar.
              </li>
              <li>Status för ett delprojekt baseras på delprojektets estimering samt registrerade tider.</li>
              <li>Status visas ej om estimering inta angivits.</li>
            </ul>
          </li>

          <li>Fakturering</li>
          <ul>
            <li>
              Den nya <Link to="fakturering">faktureringssidan</Link> grupperar alla tider och kostnader under
              respektive ticket eller ärende då de generellt alltid faktureras samtidigt.
            </li>
            <li>Export till Excel: Alla tider och kostnader kan exporteras, urvalet basera på sidan filter.</li>
            <li>
              Granskning: För att hjälpa till med faktureringsflödet finns funktionen granskning. Logiken för den är
              följande.
            </li>
            <ol>
              <li>Alla tider och kostnader för ärenden och ticketar som är stängda är redo för fakturering via Eva.</li>
              <li>
                Eva kan tagga tider och kostnader för <code>granskning</code> och ange vem som ska granska dessa.
                Användaren ser då alla deras tider och kostnader som väntar på granskning på sidan{' '}
                <Link to={`/fakturering/${user.staff_id}`}>Granskas</Link>.
              </li>
              <li>
                Användaren kan nu godkänna tider och kostnader genom att tagga dem som <code>Godkända</code> vartefter
                Eva nu kan fakturera ärendet.
              </li>
            </ol>
          </ul>
        </ul>

        <h5>Version 0.0.8 (2018-12-19)</h5>
        <ul>
          <li>Ny inställningssida med system- respektive användarinställningar (Olle 2018-12-04).</li>
          <li>Möjlighet att skapa egna statuskoder/färger (Olle 2018-12-18).</li>
          <li>Möjligt att markera/avmarkera alla på sidan Fakturering (Eva 2018-12-13).</li>
          <li>Möjlighet att skapa egna statuskoder/färger (Olle 2018-12-18).</li>
        </ul>

        <h5>Version 0.0.7 (2018-12-15)</h5>
        <ul>
          <li>Bugg: Går ej att direktlänka till sidor (Olle 2018-11-20).</li>
          <li>Logiken för kundval fungerade inte på sidan Fakturering (Jens 2018-12-13).</li>
          <li>Faktureringsräknare visades inte (Olle 2018-12-12).</li>
        </ul>

        <h5>Version 0.0.6 (2018-12-12)</h5>
        <ul>
          <li>Exportera minuter som nummer istället för text (Jens 2018-12-12).</li>
          <li>Visa organisationsnoteringar från osTicket på Faktureringssidan (Eva 2018-12-04).</li>
          <li>
            Fler fakturastatusar <code>Godwill</code>, <code>Special 1</code>, <code>Special 2</code> och{' '}
            <code>Special 3</code> (Eva 2018-12-04).
          </li>
          <li>
            Export av tider: Dela upp datum och tid för <code>created</code>, <code>updated</code>, <code>closed</code>{' '}
            så fälten är lättare att hantera i Excel (Eva 2018-12-04).
          </li>
          <li>Sortera fältet Kund i bokstavsordning på sidan Fakturering (Olle 2018-12-04).</li>
          <li>
            Dölj skapad/uppd/stängd om datum saknas eller är en tom sträng. Felaktigt reggade poster, kommer fixas av
            sig själv (Robert 2018-11-30).
          </li>
        </ul>

        <h5>Version 0.0.5 (2018-11-30)</h5>
        <ul>
          <li>Export av fakturor saknade organisationsnamn (Eva 2018-11-29).</li>
          <li>Döp om taggen Ingen debitering till Supportavtal (Eva 2018-11-29).</li>
          <li>Sortering på rödflaggade = Sortera på Stängd (Eva 2018-11-29).</li>
          <li>Faktureringsposter ikryssade även efter en uppdatering (Eva 2018-11-29).</li>
          <li>Uppdatera statusräknare när data sparas (Olle 2018-11-26).</li>
          <li>Återställa db och säkerställa uppdateringar (Olle 2018-11-26).</li>
        </ul>

        <h5>Version 0.0.3 (2018-11-18)</h5>
        <ul>
          <li>Grundläggande faktureringsfunktion till Ekonomi.</li>
          <ul>
            <li>Exportera alla träffar, inte bara de som visas i listan. (Jens 2018-11-14)</li>
            <li>Filter: fakturerad/ej fakturerad. (Eva 2018-11-10)</li>
            <li>Visa endast kunder som har obetalda fakturor. (Eva 2018-11-10)</li>
            <li>
              Fakturereringstyper: <code>fakturerad</code>, <code>intedeb</code>, <code>ej fakturerad</code>. (Eva
              2018-11-10)
            </li>
            <li>Kontrollera att kunder är knutna till en org. (Eva 2018-11-10)</li>
            <li>Exportera vyn till Excel. (Eva 2018-11-10)</li>
            <li>
              Ha möjlighet att se även de som har faktureringsflagga. Dvs kunna se allt om man släpper alla filter.
              (Jens 2018-11-05)
            </li>
            <li>Ej faktureradflagga samt kommentarsfält. (Jens 2018-11-05)</li>
            <li>Möjlighet att datum visas per uppdateratdatum snarare än ticketdatum. (Jens 2018-11-05)</li>
          </ul>
          <li>Sticky footer (Olle 2018-11-12)</li>
          <li>
            Använd <code>.env.development</code> istället för package.json. (Olle 2018-11-12)
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Om;
