package com.phonebook.app;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroupsController {
	
	@Autowired
	private GroupsService groupsService;
	
	@CrossOrigin
	@RequestMapping("/groups")
	public List<Groups> getAllGroups() {
		return groupsService.getAllGroups();
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value = "/groups")
	public String addContact(@RequestBody Groups group) {
		groupsService.addGroup(group);
		return "group create successfully";
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.DELETE, value = "/groups/{id}")
	public String deleteGroup(@PathVariable String id) {
		groupsService.deleteGroup(id);
		return "group deleted successfully";
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value="/group/{id}/contact/{cid}")
	public void addContactToGroup(@PathVariable String id, @PathVariable String cid) {
		groupsService.addContactToGroup(id, cid);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.PUT, value = "/groups/{id}")
	public String updateTopic(@PathVariable String id, @RequestBody Groups group) {
		groupsService.updateGroup(id, group);
		return "group udpated successfully";
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.DELETE, value="/group/{id}/contact/{cid}")
	public void deleteContactFromGroup(@PathVariable String id, @PathVariable String cid) {
		groupsService.deleteContactFromGroup(id, cid);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET,value= "/groups/{id}/contacts")
	public Set<Contact> getAllGroupContacts(@PathVariable String id) {
		return groupsService.getAllGroupContacts(id);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.DELETE,value= "groups/contact/{cid}")
	public void deleteContact(@PathVariable String cid) {
		groupsService.deleteContactFromGroups(cid);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value = "/groups/contact/{cid}")
	public String addContactToGroups(@RequestBody List<String> groups, @PathVariable String cid) {
		groupsService.addContactToGroups(groups, cid);
		return "Contact successfully added to different groups";
	}
	
}
