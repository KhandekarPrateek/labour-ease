"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import "./EmployeeProfile.css";
import Link from 'next/link';
import { skillsData } from '@/app/skillsDatabase'; // Assuming skillsData is available

const EmployeeProfile = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get('userID');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [skills, setSkills] = useState([]); // For selected skills
  const [search, setSearch] = useState(''); // For skill search
  const [dropdownVisible, setDropdownVisible] = useState(false); // For dropdown visibility

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/updateLabour?id=${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setSkills(data.skills || []); // Assuming skills are part of profile
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value);
    setSkills(prevSkills =>
      prevSkills.includes(value)
        ? prevSkills.filter(skillId => skillId !== value)
        : [...prevSkills, value]
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsEditing(false);

  //   const updatedProfile = { ...profile, skills };

  //   try {
  //     const response = await fetch("/api/updateLabour", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedProfile),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.message);

  //       const updatedResponse = await fetch(`/api/updateLabour?id=${userID}`);
  //       if (updatedResponse.ok) {
  //         const updatedData = await updatedResponse.json();
  //         setProfile(updatedData);
  //       } else {
  //         console.error('Failed to fetch updated profile data');
  //       }
  //     } else {
  //       const errorData = await response.json();
  //       console.error(errorData.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update profile", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
  
    const updatedProfile = { ...profile, skills };
  
    try {
      // First, update the labour profile details if needed
      const response = await fetch("/api/updateLabour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
  
        // After updating the profile, update the skills
        const skillsResponse = await fetch("/api/updateSkills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            labour_id: userID,
            skills, // Array of skill IDs
          }),
        });
        console.log({ labour_id: userID, skills });
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          console.log(skillsData.message);
  
          const updatedResponse = await fetch(`/api/updateLabour?id=${userID}`);
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            setProfile(updatedData);
          } else {
            console.error('Failed to fetch updated profile data');
          }
        } else {
          const skillsErrorData = await skillsResponse.json();
          console.error(skillsErrorData.message);
        }
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };
  
  const getInitials = (name) => {
    if (!name) return 'N/A';
    const firstInitial = name.charAt(0).toUpperCase();
    return firstInitial;
  };

  const filteredSkills = skillsData.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-img-top rounded-circle mx-auto mt-3 d-flex align-items-center justify-content-center profile-initials">
                {profile.name ? getInitials(profile.name) : 'N/A'}
              </div>
              <div className="card-body text-center">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={profile.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone:</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={profile.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address:</label>
                      <textarea
                        name="address"
                        className="form-control"
                        value={profile.address}
                        onChange={handleChange}
                        required
                        rows={3}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Experience:</label>
                      <textarea
                        name="experience"
                        className="form-control"
                        value={profile.experience}
                        onChange={handleChange}
                        required
                        rows={3}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Search and Add Skills:</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search for skills..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setDropdownVisible(true);
                        }}
                        onClick={() => setDropdownVisible(true)}
                      />
                      {dropdownVisible && (
                        <div className="skills-dropdown">
                          {filteredSkills.length > 0 ? (
                            filteredSkills.map(skill => (
                              <div className="form-check" key={skill.id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={skill.id}
                                  onChange={handleCheckboxChange}
                                  checked={skills.includes(skill.id)}
                                />
                                <label className="form-check-label">
                                  {skill.name}
                                </label>
                              </div>
                            ))
                          ) : (
                            <p>No skills found</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h5 className="card-title">{profile.name}</h5>
                    <div className="card-details">
                      <p className="card-text"><strong>📞 Phone:</strong> {profile.phone}</p>
                      <p className="card-text"><strong>🏠 Address:</strong> {profile.address}</p>
                      <p className="card-text"><strong>💼 Experience:</strong> {profile.experience}</p>
                      <p className="card-text"><strong>🛠 Skills:</strong> {profile.skills?.map(skillId => skillsData.find(skill => skill.id === skillId)?.name).join(', ') || 'None'}</p>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                    <Link href={`/employee-dashboard?userID=${userID}`}>
                      <p className="btn btn-secondary mt-3">Go to Dashboard</p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
