interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

interface User {
  id: number;
  email: string;
  phone: string;
  address: Address;
  name: Name;
  username: string;
}

export default User;