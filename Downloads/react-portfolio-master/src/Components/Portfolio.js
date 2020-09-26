import React, { Component } from 'react';

class Portfolio extends Component {
  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map(function(projects){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
          <p style={{fontWeight:"bold", color:"#6E7881", margin:'0px', textAlign:"center"}}>{projects.title}</p>
        </div>
      })
      var articles = this.props.data.articles.map(function(articles){
        var projectImage = 'images/portfolio/'+articles.image;
        return <div key={articles.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={articles.url} title={articles.title}>
               <img alt={articles.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{articles.title}</h5>
                     <p>{articles.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
          <p style={{fontWeight:"bold", color:"#6E7881", margin:'0px', textAlign:"center"}}>{articles.title}</p>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">
            <h1 style={{color:"#313131", textTransform: 'uppercase',fontWeight:"bold"}}><span style={{borderBottom: '3px solid #11ABB0',
    paddingBottom: '6px'}}>Recent Side Projects</span></h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
            </div>
            <h1 style={{color:"#313131", textTransform: 'uppercase',fontWeight:"bold"}}><span style={{borderBottom: '3px solid #11ABB0',
    paddingBottom: '6px'}}>Articles</span></h1>
            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {articles}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;
