import react, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const NewAppointmentForm = ({ currentDentist, user }) => {
  const [value, onChange] = useState(new Date());

  const [formData, setFormData] = useState({
    dentist_id: currentDentist.id,
    user_id: user.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    console.log(user.id);
    console.log(currentDentist.id);

    const newAppointment = {
      user_id: user.id,
      dentist_id: currentDentist.id,
      appointment_date_time: value,
    };

    fetch("/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log("success");
        });
      } else {
        res.json().then((json) => console.log("wrong"));
      }
    });
  };

  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} />
      <button onClick={handleSubmit}>Book</button>
    </div>
  );
};

export default NewAppointmentForm;
