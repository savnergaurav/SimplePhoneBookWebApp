package com.phonebook.app;

import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, String>{

}
