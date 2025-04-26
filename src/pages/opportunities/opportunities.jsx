import { apiRoot } from "@/api/apiRoot";
import Modal from "@/components/shared/modal";
import TablePost from "@/components/shared/table-post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    location: "",
    opportunityType: "internship",
    experienceLevel: "no_experience",
    category: "tech",
    paymentType: "paid",
    image: null,
  });

  const token = localStorage.getItem("accessToken");

  const fetchOpportunities = async () => {
    try {
      const res = await apiRoot.get("/opportunities/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpportunities(res?.data?.data);
    } catch (err) {
      console.log("Error fetching opportunities:", err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      location: "",
      opportunityType: "internship",
      experienceLevel: "no_experience",
      category: "tech",
      paymentType: "paid",
      image: null,
    });
    setSelectedOpportunity(null);
    setModalType(null);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append("image", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      if (modalType === "edit" && selectedOpportunity) {
        await apiRoot.patch(
          `/opportunities/byUser/${selectedOpportunity.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Successfully updated opportunity");
      } else {
        await apiRoot.post("/opportunities/byUser", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Successfully posted opportunity");
      }

      setOpenModal(false);
      resetForm();
      fetchOpportunities();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRoot.delete(`/opportunities/byUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Opportunity deleted");
      fetchOpportunities();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await apiRoot.get(`/opportunities/byUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormState({ ...res?.data, image: null });
      setSelectedOpportunity(res?.data);
      setModalType("edit");
      setOpenModal(true);
    } catch (err) {
      console.log("Error fetching opportunity for edit:", err);
      toast.error("Failed to load opportunity for editing");
    }
  };

  const handleDetails = async (id) => {
    try {
      const res = await apiRoot.get(`/opportunities/byUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedOpportunity(res?.data); // Assuming the response has `data.data` for the opportunity
      setModalType("details");
      setOpenModal(true);
    } catch (err) {
      console.log("Error fetching opportunity details:", err);
      toast.error("Failed to load details");
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <Input
            className="max-w-[300px] w-full"
            placeholder="Search by name"
          />
          <Button
            onClick={() => {
              resetForm();
              setModalType("create");
              setOpenModal(true);
            }}
          >
            <Plus /> Add
          </Button>
        </div>

        <div className="w-full">
          <TablePost
            opportunities={opportunities}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDetails={handleDetails}
          />
        </div>
      </div>

      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <div className="bg-white w-[400px] p-6 rounded-[12px]">
            {modalType === "details" ? (
              <>
                <h2 className="text-xl mb-3 font-semibold">
                  Opportunity Details
                </h2>
                <div>
                  <b>Name:</b> {selectedOpportunity.name}
                </div>
                <div>
                  <b>Description:</b> {selectedOpportunity.description}
                </div>
                <div>
                  <b>Location:</b> {selectedOpportunity.location}
                </div>
                <div>
                  <b>Type:</b> {selectedOpportunity.opportunityType}
                </div>
                <div>
                  <b>Experience Level:</b> {selectedOpportunity.experienceLevel}
                </div>
                <div>
                  <b>Category:</b> {selectedOpportunity.category}
                </div>
                <div>
                  <b>Payment:</b> {selectedOpportunity.paymentType}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl mb-3 font-semibold">
                  {modalType === "edit"
                    ? "Edit Opportunity"
                    : "Create Opportunity"}
                </h2>
                <form onSubmit={handlePost} className="flex flex-col gap-3">
                  <div>
                    <Label>Image</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          image: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                  {["name", "description", "location"].map((field) => (
                    <div key={field}>
                      <Label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      <Input
                        type="text"
                        value={formState[field]}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                  {[
                    "opportunityType",
                    "experienceLevel",
                    "category",
                    "paymentType",
                  ].map((field) => (
                    <div key={field}>
                      <Label>{field}</Label>
                      <select
                        value={formState[field]}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        className="w-full py-[4px] px-[12px] border border-[grey] rounded-[8px]"
                      >
                        {getOptions(field).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <Button type="submit">
                    {modalType === "edit" ? "Update" : "Create"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

const getOptions = (type) => {
  const options = {
    opportunityType: ["internship", "volunteering", "part-time", "full-time"],
    experienceLevel: ["no_experience", "junior", "middle", "senior"],
    category: ["tech", "education", "health", "environment", "arts"],
    paymentType: ["paid", "unpaid"],
  };
  return options[type];
};

export default Opportunities;
