import React from 'react'
import './Card.css'

export default function Card({ title, text, imgSrc, link }) {
  return (
    <div className="card" style={{ width: '28rem' }}>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  {text}
                </p>
                <a href={link} className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
        </div>
  )
}
