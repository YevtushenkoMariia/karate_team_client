
export type ProfileResponse = {
  birth_date: string;
  city: {
    id: string | number;
    name: string;
  };
  club: {
    id: string | number;
    name: string;
  };
  email: string;
  gender: string;
  id: string | number;
  karate_level: string;
  name: string;
  surname: string;
  phone_number: string;
  position: string;
  role: string;
  specialization: string;
};
