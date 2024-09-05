// JobData.js
import React from 'react';
import Card from './Card'; // Adjust the import path as needed

const cardData = [
  { title: 'Card title 1', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 2', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 3', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 4', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 5', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 6', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 7', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 8', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 9', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
  { title: 'Card title 10', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imgSrc: '...', link: '#' },
];

export default function JobData() {
  return (
    <div className="container text-center">
      <div className="row">
        {cardData.map((card, index) => (
          <div className="col" key={index}>
            <Card 
              title={card.title} 
              text={card.text} 
              imgSrc={card.imgSrc} 
              link={card.link} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
