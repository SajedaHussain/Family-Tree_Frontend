import { useState } from "react";
import * as personalityService from "../../services/personalityService";

const PersonalityForm = ({ addPersonality }) => {
  const [formData, setFormData] = useState({
    name: "",
    personalityType: "",
    occupation: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPersonality = await personalityService.create(formData);
    addPersonality(newPersonality);
    setFormData({ name: "", personalityType: "", occupation: "" });
  };

  return (
    <div>
      <h2>🧠 Add Personality</h2>

      <a
        href="https://www.16personalities.com/ar/اختبار-الشخصية"
        target="_blank"
        rel="noreferrer"
      >
        🔗 Take the personality test
      </a>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="personalityType"
          placeholder="Personality Type (e.g. INTJ)"
          value={formData.personalityType}
          onChange={handleChange}
          required
        />

        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
        >
          <option value="">Select occupation</option>
          <option value="Student">Student</option>
          <option value="Employee">Employee</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Other">Other</option>
        </select>

        <button>Add</button>
      </form>
    </div>
  );
};

export default PersonalityForm;
