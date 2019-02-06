package com.phonebook.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

	@Autowired
	private ContactService contactService;
	
	@CrossOrigin
	@RequestMapping("/contacts")
	public List<Contact> getAllContacts() {
		return contactService.getAllContacts();
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value = "/contacts")
	public String addContact(@RequestBody Contact contact) {
		contactService.addContact(contact);
		return "contact create successfully";
	}
	@CrossOrigin
	@RequestMapping(method = RequestMethod.PUT, value = "/contacts/{id}")
	public String updateTopic(@PathVariable String id, @RequestBody Contact contact) {
		contactService.updateContact(id, contact);
		return "contact udpated successfully";
	}
	@CrossOrigin
	@RequestMapping(method = RequestMethod.DELETE, value = "/contacts/{id}")
	public String deleteTopic(@PathVariable String id) {
		contactService.deleteContact(id);
		return "contact deleted successfully";
	}
	@CrossOrigin
	@RequestMapping(method = RequestMethod.DELETE, value = "/contacts/{id}/groups")
	public void deleteTopicRels(@PathVariable String id) {
		contactService.deleteContact(id);
	}
	
}
