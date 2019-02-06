package com.phonebook.app;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupsService {

	@Autowired
	private GroupsRepository groupsRepository;
	
	@Autowired
	private ContactRepository contactRepository;
	
	public List<Groups> getAllGroups() {
		List<Groups> groups = new ArrayList<>();
		groupsRepository.findAll().forEach(groups::add);
		return groups;
		
		
	}
	
	public void addGroup(Groups group) {
		groupsRepository.save(group);
	}
	
	public Groups getGroup(String id) {
		return groupsRepository.findById(id).get();
	}

	public void updateGroup(String id, Groups group) {
		groupsRepository.save(group);
	}

	public void deleteGroup(String id) {
		groupsRepository.deleteById(id);
	}
	
	public void addContactToGroup(String id, String cid) {
		Optional<Contact> contactGrp = contactRepository.findById(cid);
		
		Optional<Groups> group = groupsRepository.findById(id);
		
		if(contactGrp.isPresent()) {
			Contact contact = contactGrp.get();
			
			if(group.isPresent()) {
				Groups groups = group.get();
				Set<Contact>temp = groups.getContact();
				
				temp.add(contact);
				groups.setContact(temp);
				groupsRepository.save(groups);
			}
		}
		
	}
	
	public void addContactToGroups(List<String> grps, String cid) {
		Optional<Contact> contactGrp = contactRepository.findById(cid);
		Contact contact = contactGrp.isPresent() ? contactGrp.get():null;
		Iterable<Groups> grouplist = groupsRepository.findAll();
		
		for(Groups grpL : grouplist) {
			Set<Contact> temp = grpL.getContact();
			
			Set<Contact> ans = new HashSet<>();
			for(Contact con:temp) {
				if(!con.getId().equalsIgnoreCase(cid)) {
					ans.add(con);
				}
			}
			
			grpL.setContact(ans);
			groupsRepository.save(grpL);
		}
		
		
		for(String gid : grps) {
			
			Optional<Groups> group = groupsRepository.findById(gid);
			if(group.isPresent()) {
				Groups grp = group.get();
				Set<Contact> contacts = grp.getContact();
				if(contact != null) {
					contacts.add(contact);
				}
				
				grp.setContact(contacts);
				groupsRepository.save(grp);
				
			}
			
		}
		
	}
	
	
	public void deleteContactFromGroup(String id, String cid) {
		Optional<Groups> group = groupsRepository.findById(id);
		
		if(group.isPresent()) {
			Groups groups = group.get();
			Set<Contact> temp = groups.getContact();
			
			Set<Contact> ans =new HashSet<>();
			
			for(Contact contact:temp)
			{
				if(!contact.getId().equalsIgnoreCase(cid)) {
					ans.add(contact);
				}
			}
			
			groups.setContact(ans);
			groupsRepository.save(groups);
		}
	}
	
	public Set<Contact> getAllGroupContacts(String id)
	{
		Optional<Groups> group = groupsRepository.findById(id);
			Groups groups = null;
			if(group.isPresent()) {
				groups = group.get();
			}
			
			return groups.getContact();
		}
	
	public void deleteContactFromGroups(String cid) {
		Iterable<Groups> group = groupsRepository.findAll();
		
		for(Groups grp : group) {
			Set<Contact> contacts = grp.getContact();
			Set<Contact> ans = new HashSet<>();
			for(Contact contact: contacts) {
				if(!(contact.getId().equalsIgnoreCase(cid))) {
					ans.add(contact);
				}
			}
			grp.setContact(ans);
			groupsRepository.save(grp);
		}
	}
	
}
