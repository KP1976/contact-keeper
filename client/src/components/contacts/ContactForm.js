import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'osobisty',
	});

	const { name, email, phone, type } = contact;

	const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		contactContext.addContact(contact);
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'osobisty',
		});
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>Dodaj kontakt</h2>
			<input type='text' placeholder='Imię i nazwisko' name='name' value={name} onChange={onChange} />
			<input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
			<input type='text' placeholder='Telefon' name='phone' value={phone} onChange={onChange} />
			<h5>Typ kontaktu</h5>
			<input
				type='radio'
				name='type'
				value='osobisty'
				checked={type === 'osobisty'}
				onChange={onChange}
			/> Osobisty{' '}
			<input type='radio' name='type' value='profesjonalny' checked={type === 'profesjonalny'} onChange={onChange} />{' '}
			Profesjonalny
			<div>
				<input type='submit' defaultValue='Dodaj kontakt' className='btn btn-primary btn-block' />
			</div>
		</form>
	);
};

export default ContactForm;
