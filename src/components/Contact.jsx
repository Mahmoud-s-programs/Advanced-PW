import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useJourney } from '../world/useJourney';
import Magnetic from './ui/Magnetic';
import Reveal from './ui/Reveal';
import { Icon } from './ui/Icon';

const emptyForm = {name:'',email:'',message:'',website:''};
function readDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem('autumn-contact-draft') || '{}');
    return {...emptyForm,...Object.fromEntries(['name','email','message'].filter((key) => typeof draft[key] === 'string').map((key) => [key,draft[key]]))};
  } catch { return {...emptyForm}; }
}
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (form.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.';
  return errors;
}

function ExperienceControls() {
  const { reducedMotion, systemReduced, paused, setPaused, qualityPreference, setQualityPreference } = useJourney();
  return <div className='experience-controls'><button className='motion-toggle' onClick={() => setPaused(!paused)} disabled={systemReduced} aria-label={systemReduced ? 'Reduced motion follows your system preference' : reducedMotion ? 'Enable ambient motion' : 'Pause ambient motion'} aria-pressed={reducedMotion}><Icon name={reducedMotion ? 'play' : 'pause'} /><span>{reducedMotion ? 'Stillness mode' : 'Motion on'}</span></button><label className='quality-control'><span>Visuals</span><select value={qualityPreference} onChange={(event) => setQualityPreference(event.target.value)} aria-label='Visual quality'><option value='auto'>Automatic</option><option value='high'>Full forest</option><option value='medium'>Balanced</option><option value='low'>Lightweight</option></select></label></div>;
}

export default function Contact() {
  const [form,setForm] = useState(readDraft);
  const [errors,setErrors] = useState({});
  const [status,setStatus] = useState({type:'idle',message:''});
  const refs = useRef({});
  const mounted = useRef(true);
  const submitting = useRef(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    try { sessionStorage.setItem('autumn-contact-draft',JSON.stringify({name:form.name,email:form.email,message:form.message})); } catch { /* Keep the form working without browser storage. */ }
  }, [form]);
  const change = (event) => {
    const {name,value} = event.target;
    setForm((previous) => ({...previous,[name]:value}));
    setErrors((previous) => ({...previous,[name]:undefined}));
    if (status.type !== 'sending') setStatus({type:'idle',message:''});
  };
  const submit = async (event) => {
    event.preventDefault();
    if (submitting.current || form.website) return;
    const problems = validate(form);
    setErrors(problems);
    if (Object.keys(problems).length) { refs.current[Object.keys(problems)[0]]?.focus(); return; }
    const service = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey) { setStatus({type:'error',message:'Email delivery is unavailable here. Please use the email link to reach me directly.'}); return; }
    submitting.current = true;
    setStatus({type:'sending',message:'Sending your message…'});
    try {
      await emailjs.send(service,template,{from_name:form.name.trim(),to_name:'Mahmoud Alkwisem',from_email:form.email.trim(),to_email:'mahmoudalkwisem@gmail.com',message:form.message.trim()},publicKey);
      if (!mounted.current) return;
      setStatus({type:'success',message:'Your message is on its way. Thank you — I’ll get back to you soon.'});
      setForm({...emptyForm});
      try { sessionStorage.removeItem('autumn-contact-draft'); } catch { /* Optional draft storage. */ }
    } catch {
      if (mounted.current) setStatus({type:'error',message:'Your message couldn’t be sent. Your draft is safe; try again or email me directly.'});
    } finally { submitting.current = false; }
  };
  return <section id='contact' className='chapter contact-section section-shell' aria-labelledby='contact-title'>
    <Reveal className='chapter-label'><span>06 / THE LAST LIGHT</span><span className='fine-line' /></Reveal>
    <div className='contact-layout'><div className='contact-copy'><Reveal><p className='eyebrow'>A new idea on the horizon?</p><h2 id='contact-title'>Let’s build<br />something<br /><em>unforgettable.</em></h2><p>Have a project in mind, a question, or a good idea?<br />I’d love to hear it.</p><Magnetic className='contact-email' href='mailto:mahmoudalkwisem@gmail.com'>mahmoudalkwisem@gmail.com <Icon name='northeast' /></Magnetic><a className='social-link' href='https://github.com/Mahmoud-s-programs' target='_blank' rel='noopener noreferrer'><Icon name='github' /> Find me on GitHub <Icon name='northeast' /></a></Reveal></div>
    <Reveal className='contact-form-wrap' delay={0.15}><form className='contact-form' noValidate onSubmit={submit} aria-label='Send Mahmoud a message'>
      <p className='form-caption'><span className='ember-dot' /> A conversation starts here</p>
      <div className='form-row'>{[['name','Your name','text','Ada Lovelace',80],['email','Email address','email','ada@example.com',254]].map(([key,label,type,placeholder,max]) => <div className='form-field' key={key}><label htmlFor={`contact-${key}`}>{label}</label><input id={`contact-${key}`} ref={(element) => {refs.current[key]=element;}} name={key} type={type} value={form[key]} placeholder={placeholder} maxLength={max} autoComplete={key === 'name' ? 'name' : 'email'} required disabled={status.type === 'sending'} onChange={change} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <span className='field-error' id={`${key}-error`}>{errors[key]}</span>}</div>)}</div>
      <div className='form-field'><label htmlFor='contact-message'>What are you thinking?</label><textarea id='contact-message' ref={(element) => {refs.current.message=element;}} name='message' value={form.message} placeholder='Tell me a little about your idea…' minLength='10' maxLength='4000' rows='4' required disabled={status.type === 'sending'} onChange={change} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <span className='field-error' id='message-error'>{errors.message}</span>}</div>
      <div className='honeypot' aria-hidden='true'><label htmlFor='contact-website'>Website</label><input id='contact-website' name='website' value={form.website} onChange={change} tabIndex='-1' autoComplete='off' /></div>
      <div className='form-submit-row'><Magnetic as='button' className='button button-primary' type='submit' disabled={status.type === 'sending'}>{status.type === 'sending' ? 'Sending…' : 'Send a message'}<Icon name={status.type === 'success' ? 'check' : 'northeast'} /></Magnetic><span>Small note. Big possibilities.</span></div>
      <p className={`form-status ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</p>
    </form></Reveal></div>
    <footer className='site-footer'><a href='#home' className='footer-brand' aria-label='Back to the beginning'>ma<span>.</span></a><p>© {new Date().getFullYear()} Mahmoud Alkwisem<br /><span>Built with curiosity. Rooted in code.</span></p><ExperienceControls /><a className='back-top' href='#home'>Back to the canopy <Icon name='northeast' /></a></footer>
  </section>;
}
