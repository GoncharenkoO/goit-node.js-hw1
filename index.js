const contacts = require("./contacts");

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allList = await contacts.listContacts();
      console.table(allList);
      break;
    case "get":
      const getByld = await contacts.getContactById(id);
      console.table(getByld);
      break;
    case "add":
      const addByld = await contacts.addContact(name, email, phone);
      console.table(addByld);
      break;
    case "remove":
      const removeByld = await contacts.removeContact(id);
      console.table(removeByld);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!]");
  }
};

invokeAction(argv);
