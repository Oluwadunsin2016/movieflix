// src/components/ProfileSection.js
import React, { useState, useEffect } from 'react';
import { 
  Edit, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  CheckCircle,
  XCircle,
  LoaderCircle,
  Maximize2
} from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useAuth } from '../context/AuthContext';
import { useUpdateUser, useUploadProfileImage } from '../api/authMutation';
import { setToast } from './Toast/toastUtils';

const ProfileSection = () => {
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const { mutateAsync: uploadProfile, isPending: isUploading } = useUploadProfileImage();
  const { user, isLoading } = useAuth();
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onOpenChange: onInfoOpenChange } = useDisclosure();

  useEffect(() => {
    if (user) {
      setUserData(user);
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await updateUser(formData);
    if (response.success) {
      setToast("success", response.message || "Profile updated successfully");
      onInfoOpenChange();
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const response = await uploadProfile({ file });
      if (response.success) {
        setToast("success", response.message || "Profile image updated successfully");
      } else {
        setToast("error", response.message || "Failed to update profile image");
      }
    }
  };

  // Skeleton loading component
  const ProfileSkeleton = () => (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="relative">
        <div className="bg-gray-800 h-32 md:h-48 w-full" />
        <div className="absolute bottom-0 left-6 md:left-12 lg:left-16 xl:left-20 2xl:left-24 transform translate-y-1/2">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 bg-gray-700" />
            <div className="absolute bottom-2 right-2 bg-gray-600 text-gray-600 p-2 rounded-full">
              <Camera size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-20 mx-6 md:mx-12 lg:mx-16 xl:mx-20 2xl:mx-24">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-10 bg-gray-700 rounded w-32"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-800/80 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-700 p-2 rounded-full w-10 h-10"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
              </div>

              <div className="space-y-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j}>
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* Profile Header */}
          <div className="relative">
            <div className="bg-gradient-to-r from-red-800 to-black h-32 md:h-48 w-full" />
            <div className="absolute bottom-0 left-6 md:left-12 lg:left-16 xl:left-20 2xl:left-24 transform translate-y-1/2">
              <div className="relative group">
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                >
                  <img 
                    src={userData?.profileImage || "https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"} 
                    alt="Profile" 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
                    <Maximize2 
                      size={24} 
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                </div>
                
                {isUploading && (
                  <div className="absolute top-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 bg-black/60 flex items-center justify-center">
                    <LoaderCircle size={40} className='animate-spin text-white' />
                  </div>
                )}
                
                <button className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className='cursor-pointer'>
                    <Camera size={16} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-20 mx-6 md:mx-12 lg:mx-16 xl:mx-20 2xl:mx-24">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl md:text-3xl font-bold text-white">{userData?.firstName} {userData?.lastName}</h1>
              <Button 
                onPress={onInfoOpen}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 text-sm md:text-base px-4 py-2 rounded-lg transition-colors"
              >
                <Edit size={16} /> Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-2 rounded-full">
                    <User size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-white">Personal Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">First Name</p>
                    <p className="text-white md:text-lg">{userData?.firstName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Name</p>
                    <p className="text-white md:text-lg">{userData?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white md:text-lg">{userData?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white md:text-lg">{userData?.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Mail size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-white">Subscription</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Plan</p>
                    <p className="text-white md:text-lg">Premium Ultra HD</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Billing Date</p>
                    <p className="text-white md:text-lg">15th of each month</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white md:text-lg">Visa ending in 4242</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <p className="text-green-500 md:text-lg">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Info Modal */}
          <Modal isOpen={isInfoOpen} onOpenChange={onInfoOpenChange}>
            <ModalContent className="bg-gray-900 text-white border border-gray-700 max-w-2xl">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <Edit size={24} className="text-red-600" />
                      <h3 className="text-xl font-bold">Edit Profile Information</h3>
                    </div>
                  </ModalHeader>
                  <ModalBody className="py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter className="border-t border-gray-700">
                    <Button 
                      color="danger" 
                      variant="light" 
                      onPress={onClose}
                      className="flex items-center gap-2"
                    >
                      <XCircle size={18} /> Cancel
                    </Button>
                    <Button 
                      color="primary" 
                      onPress={handleSave}
                      className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                    >
                      {isPending ? (
                        <span className='flex items-center gap-1'>
                          <LoaderCircle className='animate-spin' size={20} /> Updating...
                        </span>
                      ) : (
                        <span className='flex items-center gap-1'>
                          <CheckCircle size={18} /> Save Changes
                        </span>
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Profile Image Modal */}
          {showImageModal && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <div className="relative max-w-4xl w-full">
                <button 
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-red-600 transition-colors"
                  onClick={() => setShowImageModal(false)}
                >
                  <XCircle size={24} />
                </button>
                <img 
                  src={userData?.profileImage || "https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"} 
                  alt="Profile" 
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="mt-4 text-center text-gray-300">
                  <p>Click anywhere to close</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSection;