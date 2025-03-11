import React from "react";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <h2>Мен жөнүндө</h2>
      <div className="info-about container">
        <div className="block1">
          <p className="p">
            Менин аты жонум <strong>Талипжанов Алишер Манасович</strong>. Мен
            <strong>front end</strong> багытында веб-тиркемелерди иштеп
            чыгуучумун. Мен үчүн веб-сайттарды жаратуу—чыгармачылык менен
            технологияны айкалыштыруунун эң мыкты жолу. Менин максатым—бул
            тармакта өзүмдү көрсөтүп,пайдалануучуга ыңгайлуу жана көркөм
            веб-тиркемелерди түзүү жана оз тажрыйбамды чонойтуу. Менин 6 айлык
            тажрыйбамда <strong>JavaScript, React, GitHub</strong> жана
            <strong>TypeScript</strong> сыяктуу технологиялар менен иштедим. Код
            жазуудан тышкары, мага креативдүү долбоорлорго катышуу, дизайн жасоо
            жана жаңы технологияларды үйрөнүү жагат. Жеке жашоомдо гитара
            черткенди жакшы кором.
          </p>
        </div>
        <div className="block2">
          <img src="/photo.png" alt="photo" />
        </div>
      </div>
    </section>
  );
}

export default About;
