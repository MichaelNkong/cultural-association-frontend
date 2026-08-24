
import Header from "@/app/components/ui/header"
import ImageSlider from "@/app/Images/imagesslider" 
import Footer from  "@/app/components/ui/footer"
export default async function Home() {
  
  return (
  

     <div className="site-frame">
     <Header/>
        <main className="home-main">
          <section className="home-intro">
            <p className="eyebrow">A living archive of us</p>
            <h1>Culture is not behind us. <em>It is how we meet.</em></h1>
            <p className="home-lede">Manyu brings people together through shared stories, gatherings, and the traditions that make a community feel like home.</p>
          </section>
          <section className="slider-frame" aria-label="Association highlights">
            <ImageSlider/>
          </section>
          <div className="home-signpost">
            <span>Explore the association</span>
            <span className="signpost-line" aria-hidden="true" />
            <span>Events · Members · Stories</span>
          </div>
        </main>
        <Footer/>
      </div>

      </div>

  );
}