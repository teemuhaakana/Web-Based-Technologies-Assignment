//kotisivu
import '../App.css';

function HomePage() {

  return (
    <div className="homepage">
      <div className='homepage-content'>
        <h4>Tervetuloa!</h4>
        <p>Tämän sovelluksen avulla voit selata TV-sarjoja vaivattomasti eri genrejen mukaan. Halutessasi voit myös hakea TV-sarjoja nimellä tai muilla hakusanoilla.</p>
        <br></br>
        <p>Sovellus listaa TVMaze API:sta haetut TV-sarjat. TV-sarjaa klikattaessa sarjasta näytetään lisätietoja, kuten sarjan näyttelijät, sarjan kaudet ja jaksot. 
        Tiedot perustuvat siis TVMazen tietoihin eri TV-sarjoista. Kaikkea tietoa ei välttämättä löydy.</p>
        <br></br>
        <p>Toivottavasti löydät jonkin mieleisen TV-sarjan sovelluksen avulla. Mukavia selaushetkiä!</p>
      </div>
    </div>
  );
}

export default HomePage;
