import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, clearCurrent, updateContact, current } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'osobisty',
			});
		}
	}, [contactContext, current]);

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

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Edytuj kontakt' : 'Dodaj kontakt'}</h2>
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
				<input
					type='submit'
					value={current ? 'Modyfikuj kontakt' : 'Dodaj kontakt'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Wyczyść
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
