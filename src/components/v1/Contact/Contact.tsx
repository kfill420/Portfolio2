import { useEffect, useState } from 'react';
import './Contact.scss';
import { User, AtSign, Phone, Type } from 'react-feather';
import Anim from '../Anim/Anim';

function Contact({ contactTarget }: { contactTarget: React.RefObject<HTMLDivElement | null> }) {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    phone: '',
    text: '',
    rgpd: false
  });

  const [validData, setValidData] = useState({
    name: false,
    mail: false,
    phone: false,
    text: false,
    rgpd: false
  });

  const [isValidForm, setIsValidForm] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/
    return re.test(phone);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'rgpd') {
      setFormData({ ...formData, rgpd: !formData.rgpd });
      setValidData({ ...validData, rgpd: !validData.rgpd });
      return;
    } else if (name === 'phone' && value.length > 10) return;
    else setFormData({ ...formData, [name]: value });

    if (name === 'name' && value.length > 2)
      setValidData({ ...validData, name: true });
    else if (name === 'name' && value.length <= 2) setValidData({ ...validData, name: false });

    if (name === 'mail' && validateEmail(value))
      setValidData({ ...validData, mail: true });
    else if (name === 'mail' && !validateEmail(value)) setValidData({ ...validData, mail: false });

    if (name === 'phone' && validatePhone(value))
      setValidData({ ...validData, phone: true });
    else if (name === 'phone' && !validatePhone(value)) setValidData({ ...validData, phone: false });

    if (name === 'text' && value.length > 5)
      setValidData({ ...validData, text: true });
    else if (name === 'text' && value.length <= 5) setValidData({ ...validData, text: false });
  };

  useEffect(() => {
    if (validData.name) {
      document.getElementById('userLogo')?.classList.add('contact_form_user_logo-valide');
    } else document.getElementById('userLogo')?.classList.remove('contact_form_user_logo-valide');

    if (validData.mail) {
      document.getElementById('mailLogo')?.classList.add('contact_form_mail_logo-valide');
    } else document.getElementById('mailLogo')?.classList.remove('contact_form_mail_logo-valide');

    if (validData.phone) {
      document.getElementById('phoneLogo')?.classList.add('contact_form_phone_logo-valide');
    } else document.getElementById('phoneLogo')?.classList.remove('contact_form_phone_logo-valide');

    if (validData.text) {
      document.getElementById('textLogo')?.classList.add('contact_form_text_logo-valide');
    } else document.getElementById('textLogo')?.classList.remove('contact_form_text_logo-valide');

    const allDataValid = Object.values(validData).every(value => value === true);
    if (allDataValid) setIsValidForm(true);
    else setIsValidForm(false);
  }, [validData]);

  return (
    <div ref={contactTarget} className="contact">
      <Anim className="animation1" iv="iv1">
        <h2 className='contact_title'>Contactez-moi</h2>
      </Anim>
      <form className='contact_form' action="https://formspree.io/f/xzzbeyaj" method='POST'>
        <Anim className="animation1" iv="iv1">
          <div className='contact_form_user'>
            <div id='userLogo' className='contact_form_user_logo'><User className='contact_form_user_logo_feather' /></div>
            <input className='contact_form_user_input' type="text" name="name" id="name" required placeholder='Nom' onChange={handleChange} value={formData.name} />
            <div className='contact_form_user_required'>*</div>
          </div>
        </Anim>
        <Anim className="animation1" iv="iv1">
          <div className='contact_form_mail'>
            <div id='mailLogo' className='contact_form_mail_logo'><AtSign className='contact_form_mail_logo_feather' /></div>
            <input className='contact_form_mail_input' type="text" name="mail" id="mail" required placeholder='E-mail' onChange={handleChange} value={formData.mail} />
            <div className='contact_form_mail_required'>*</div>
          </div>
        </Anim>
        <Anim className="animation1" iv="iv1">
          <div className='contact_form_mail'>
            <div id='phoneLogo' className='contact_form_phone_logo'><Phone className='contact_form_mail_logo_feather' /></div>
            <input className='contact_form_phone_input' type="number" name="phone" id="phone" placeholder='Téléphone' minLength={10} maxLength={10} onChange={handleChange} value={formData.phone} />
            <div className='contact_form_phone_required'>*</div>
          </div>
        </Anim>
        <Anim className="animation1" iv="iv1">
          <div className='contact_form_text'>
            <div id='textLogo' className='contact_form_text_logo'><Type className='contact_form_mail_logo_feather' /></div>
            <textarea className='contact_form_text_input' name="text" id="text" placeholder='Informations complémentaires' rows={5} required onChange={handleChange} value={formData.text} />
            <div className='contact_form_text_required'>*</div>
          </div>
        </Anim>
        <Anim className="animation1" iv="iv1">
          <div className='contact_form_rgpd'>
            <input type="checkbox" name="rgpd" id="rgpd" onChange={handleChange} checked={formData.rgpd} />
            <label htmlFor="rgpd">En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de la demande de contact.</label>
          </div>
        </Anim>
        <Anim className="animation1" iv="iv1">
          <input className={`contact_form_submit  ${isValidForm ? 'contact_form_submit-isValid' : ''} `} type="submit" value="ENVOYER" disabled={!isValidForm} />
        </Anim>
      </form>
    </div>
  );
}

export default Contact;
// service ID: service_u8dm6hb
