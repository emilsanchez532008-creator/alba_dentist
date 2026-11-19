(function(){
 var WA='524774020597',$=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
 var hd=$('#hd'),burger=$('#burger'),menu=$('#menu');
 function onScroll(){hd.classList.toggle('sc',window.scrollY>24)}
 window.addEventListener('scroll',onScroll,{passive:true});onScroll();
 function toggle(open){burger.classList.toggle('open',open);menu.classList.toggle('open',open);document.body.classList.toggle('lock',open);burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')}
 burger.addEventListener('click',function(){toggle(!menu.classList.contains('open'))});
 $$('a',menu).forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
 window.addEventListener('resize',function(){if(window.innerWidth>=1024)toggle(false)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
 /* Reveal */
 var els=$$('.rv');
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(el){io.observe(el)})}
 else els.forEach(function(el){el.classList.add('on')});
 /* Filtros */
 var chips=$$('.chip'),cards=$$('.bc');
 chips.forEach(function(c){c.addEventListener('click',function(){
  chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)});
  cards.forEach(function(k){k.classList.toggle('dim',c.dataset.f!=='all'&&k.dataset.c!==c.dataset.f)});
 })});
 /* WhatsApp por servicio */
 $$('.wa-svc').forEach(function(a){
  a.href='https://wa.me/'+WA+'?text='+encodeURIComponent('¡Hola! Me gustaría consultar el servicio de "'+a.dataset.s+'" en Alba Family Dental.');
  a.target='_blank';a.rel='noopener';
 });
 /* Avisos legales */
 $$('[data-modal]').forEach(function(b){b.addEventListener('click',function(){var m=$('#'+b.dataset.modal);m.classList.add('open');document.body.classList.add('lock')})});
 $$('.modal').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m||e.target.classList.contains('modal-close')){m.classList.remove('open');document.body.classList.remove('lock')}})});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){$$('.modal.open').forEach(function(m){m.classList.remove('open')});document.body.classList.remove('lock')}});
 /* Formulario */
 var form=$('#form'),ok=$('#ok');
 function setErr(id,msg){var f=$('#'+id).closest('.f');f.classList.toggle('err',!!msg);$('.em',f).textContent=msg||''}
 ['n','t','h','s'].forEach(function(id){$('#'+id).addEventListener('input',function(){setErr(id,'')});$('#'+id).addEventListener('change',function(){setErr(id,'')})});
 form.addEventListener('submit',function(e){
  e.preventDefault();
  var n=$('#n').value.trim(),t=$('#t').value.replace(/\D/g,''),h=$('#h').value,s=$('#s').value,m=$('#m').value.trim(),bad=null;
  var errs={n:n.length<3||!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/.test(n)?'Escribe tu nombre completo, solo con letras.':'',
   t:t.length<10||t.length>13?'Ingresa un teléfono de 10 dígitos.':'',
   s:!s?'Elige un servicio de interés.':'',h:!h?'Elige un horario preferido.':''};
  ['n','t','s','h'].forEach(function(k){setErr(k,errs[k]);if(errs[k]&&!bad)bad=k});
  if(bad){$('#'+bad).focus();return}
  var txt='¡Hola! Quisiera solicitar una cita en Alba Family Dental.\n\n*Nombre:* '+n+'\n*Teléfono:* '+t+'\n*Servicio:* '+s+'\n*Horario preferido:* '+h+'\n*Mensaje:* '+(m||'Sin mensaje adicional')+'\n\nQuedo atento(a) a su confirmación. ¡Gracias!';
  var url='https://wa.me/'+WA+'?text='+encodeURIComponent(txt);
  $('#okwa').href=url;form.style.display='none';ok.classList.add('show');
  window.open(url,'_blank','noopener');
  ok.scrollIntoView({behavior:'smooth',block:'center'});
 });
})();

