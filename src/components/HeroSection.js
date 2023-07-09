import React from 'react'
import "./Hero.css"
import ImageUploader from './ImageUploader'
import { Link } from 'react-router-dom';



const HeroSection = () => {
  return (
    <div className='container'>
      <div className='box'>
        <div className='panal-header'>

          <div>
            <Link to="#" className='option'>Photos</Link>
          </div>
          <div className='menu-section'>
          <Link to="#" className='option'>PhotoStream</Link>
            <Link to="#" className='option'>Album</Link>
          </div>

        </div>
        <div>
          <ImageUploader />
        </div>
      </div>
      <div className='btn'>
        <div className='btn-section'>
          <button id='btn-continue'>Continue</button>
          <button id='btn-skip'>Skip</button>
        </div>
        {/* <button id='btn-skip'> + Add More Photos</button> */}

      </div>
    </div>
  )
}

export default HeroSection



