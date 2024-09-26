import { createContext } from "react";

interface Contact {
  id: any;
  name: string;
  email: string;
  gender: string;
}

interface ContactContextType {
  foundContacts: Contact[];
  setFoundContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  deleteContact: (id: string) => Promise<void>;
  addContactHandler: (contact: Omit<Contact, "id">) => Promise<void>;
  getAllContacWithSearch: (searchWord?: string) => Promise<void>;
  currentPage: number;
  totalContacts: number;
  paginate: (pageNumber: number) => void;
  contactsPerPage: number;
  renderCurrentPagintionContacts: () => Contact[];
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  emptySearchText: string;
  showPagination: boolean;
}

export const contactContext = createContext<any>(null);
