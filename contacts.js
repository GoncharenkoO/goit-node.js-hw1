const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.filter(
    (contacts) => contacts.id === String(contactId)
  );
  if (!result) {
    return contacts;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.filter(
    (contacts) => contacts.id !== String(contactId)
  );
  if (!result) {
    return contacts;
  }
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContacts = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContacts);
  updateContacts(contacts);
  return contacts;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
