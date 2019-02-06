package com.phonebook.app;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
	
	@Autowired
	private ContactRepository contactRepository;
	
	public List<Contact> getAllContacts(){
		List<Contact> contacts = new ArrayList<>();
		contactRepository.findAll().forEach(contacts::add);
		return contacts;
	}
	public void addContact(Contact contact) {
		contactRepository.save(contact);
	}
	
	public Contact getContact(String id) {
		return contactRepository.findById(id).get();
	}

	public void updateContact(String id, Contact contact) {
		contactRepository.save(contact);
	}

	public void deleteContact(String id) {
		contactRepository.deleteById(id);
	}
}
