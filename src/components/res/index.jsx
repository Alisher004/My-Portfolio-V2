import React from 'react'
import './Resume.css'

const Resume = () => {
	return (
		<div className="resume-page" id='resume'>
			<div className="resume-actions">
				<a className="resume-download" href="/резюме.pdf" download>Скачать резюме (PDF)</a>
			</div>

			<div className="resume-wrapper">
				{/* Primary: embed PDF from public/resume.pdf; fallback to image if browser blocks PDF preview */}
				<iframe className="resume-iframe" src="/резюме.pdf" title="Resume PDF" />
				{/* <img className="resume-image" src="/resume.png" alt="Resume" /> */}
			</div>
		</div>
	)
}

export default Resume