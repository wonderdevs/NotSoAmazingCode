//source: https://uiverse.io/Galahhad/happy-dodo-17
import { useState } from 'react';
import './CRSlider.css';

export default function CRSlider () {
    const [CRValue, setCRValue] = useState(-1);

    return(
        <div className='sliderContainer'>
            <div className='checkboxContainer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sword" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z" /><path d="M6.5 11.5l6 6" /></svg>
                CR
            </div>
            <label className="slider">
                <input name='cr' type="range" className="level" value={CRValue} onChange={(e) => setCRValue(parseInt(e.target.value))} step={1} min={-1} max={30}/>
            </label>
            <span>{CRValue === -1? 'All':CRValue}</span>
        </div>
    )
}