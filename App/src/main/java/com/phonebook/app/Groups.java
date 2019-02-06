package com.phonebook.app;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Groups implements Serializable{

	public Groups() {
		
	}
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	@Column(name="id")
	private String id;
	
	@Column(name="name")
	private String name;
	
	@ElementCollection(targetClass = Contact.class)
	private Set<Contact> contact = new HashSet<>();
	
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Contact> getContact() {
		return contact;
	}

	public void setContact(Set<Contact> contact) {
		this.contact = contact;
	}

	public Groups(String id, String name, Set<Contact> contact) {
		super();
		this.id = id;
		this.name = name;
		this.contact = contact;
	}
	


	
}
