import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, UploadCloud, X, FileText, Phone, Mail } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const InquiryForm = ({ prefilledPlanName }) => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    projectBrief: '',
    budgetRange: '',
    timeline: '',
    siteLocation: '',
    additionalNotes: '',
    pathwaySource: '',
    selectedPlan: prefilledPlanName || ''
  });
  
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form from URL parameters or props
  useEffect(() => {
    const planName = prefilledPlanName || searchParams.get('plan');
    const pathway = searchParams.get('pathway');
    
    setFormData(prev => ({
      ...prev,
      selectedPlan: planName || prev.selectedPlan,
      pathwaySource: pathway || prev.pathwaySource,
      projectBrief: planName && !prefilledPlanName && !prev.projectBrief 
        ? `I am interested in the ${planName} floor plan.\n\n` 
        : prev.projectBrief
    }));
  }, [searchParams, prefilledPlanName]);

  const budgetRanges = [
    'Under $100,000',
    '$100,000 - $200,000',
    '$200,000 - $300,000',
    '$300,000 - $500,000',
    '$500,000+',
    'Prefer not to say'
  ];

  const australianStates = [
    'New South Wales',
    'Victoria',
    'Queensland',
    'South Australia',
    'Western Australia',
    'Tasmania',
    'Northern Territory',
    'Australian Capital Territory'
  ];

  const pathwayOptions = [
    'Bring Your Own Design',
    'Browse Our Range',
    'Browse Our Range - Purchase As-Is',
    'Browse Our Range - Customisation',
    'Custom Design Service',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError('');

    if (files.length + selectedFiles.length > 3) {
      setError('You can only upload a maximum of 3 files.');
      return;
    }

    const validFiles = [];
    const invalidFiles = [];

    selectedFiles.forEach(file => {
      // Check size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (exceeds 10MB)`);
        return;
      }
      
      // Check type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      // Also allow dwg by extension since mime type can vary
      const isDwg = file.name.toLowerCase().endsWith('.dwg');
      
      if (!validTypes.includes(file.type) && !isDwg) {
        invalidFiles.push(`${file.name} (invalid format)`);
        return;
      }

      validFiles.push(file);
    });

    if (invalidFiles.length > 0) {
      setError(`Some files were rejected: ${invalidFiles.join(', ')}`);
    }

    setFiles(prev => [...prev, ...validFiles]);
    
    // Reset input so same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const validateForm = () => {
    if (!formData.clientName.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (!formData.projectBrief.trim()) {
      setError('Please describe your project');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key === 'selectedPlan') return; // Skip, we'll merge it into projectBrief
        
        if (key === 'projectBrief' && formData.selectedPlan) {
          submitData.append(key, `Selected Plan: ${formData.selectedPlan}\n\n${formData[key]}`);
        } else if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Append files
      files.forEach(file => {
        submitData.append('filesUploaded', file);
      });

      await pb.collection('inquiries').create(submitData, { $autoCancel: false });
      
      setSuccess(true);
      toast({
        title: "Inquiry Submitted Successfully",
        description: "We'll be in touch within 24-48 hours.",
        variant: "default",
      });

      setFormData({
        clientName: '',
        email: '',
        phone: '',
        projectBrief: '',
        budgetRange: '',
        timeline: '',
        siteLocation: '',
        additionalNotes: '',
        pathwaySource: '',
        selectedPlan: prefilledPlanName || ''
      });
      setFiles([]);
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Failed to submit inquiry. Please try again or contact us directly.');
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center shadow-lg"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
        <p className="text-green-800 mb-6">
          Your inquiry has been successfully submitted. Our engineering team will review your project details and get back to you within 24-48 hours.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 text-green-800">
          <p className="text-sm">Need immediate assistance?</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="tel:0257601059" 
              className="inline-flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-900 font-bold px-4 py-2 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              02 5760 1059
            </a>
            <a 
              href="mailto:info@synchrobuild.com.au" 
              className="inline-flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-900 font-bold px-4 py-2 rounded-full transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@synchrobuild.com.au
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-100"
    >
      <div className="flex flex-col gap-4 pb-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a 
              href="tel:0257601059" 
              className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              02 5760 1059
            </a>
            <a 
              href="mailto:info@synchrobuild.com.au" 
              className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              info@synchrobuild.com.au
            </a>
          </div>
        </div>
        <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <span className="font-semibold">Contact us directly:</span> Prefer not to fill out a form? Email us at <a href="mailto:info@synchrobuild.com.au" className="text-blue-600 hover:underline font-medium">info@synchrobuild.com.au</a>
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3 rounded-r-md">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {formData.selectedPlan && (
        <div className="space-y-2">
          <Label htmlFor="selectedPlan">Selected Floor Plan / Kit</Label>
          <Input
            id="selectedPlan"
            name="selectedPlan"
            value={formData.selectedPlan}
            readOnly={!!prefilledPlanName}
            disabled={!!prefilledPlanName}
            className={`bg-gray-50 ${prefilledPlanName ? 'text-gray-500 cursor-not-allowed font-medium' : ''}`}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="clientName">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="John Smith"
            className="bg-gray-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="bg-gray-50"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0400 000 000"
            className="bg-gray-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteLocation">Site Location (State)</Label>
          <Select value={formData.siteLocation} onValueChange={(val) => handleSelectChange('siteLocation', val)}>
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {australianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pathwaySource">How did you hear about us? / Which pathway interests you?</Label>
        <Select value={formData.pathwaySource} onValueChange={(val) => handleSelectChange('pathwaySource', val)}>
          <SelectTrigger className="bg-gray-50">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {pathwayOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectBrief">Project Description <span className="text-red-500">*</span></Label>
        <Textarea
          id="projectBrief"
          name="projectBrief"
          value={formData.projectBrief}
          onChange={handleChange}
          rows={4}
          className="bg-gray-50 resize-none"
          placeholder="Tell us about your project... What are you looking to build? Any specific requirements or design ideas?"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget Range</Label>
          <Select value={formData.budgetRange} onValueChange={(val) => handleSelectChange('budgetRange', val)}>
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Desired Completion Date</Label>
          <Input
            type="date"
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-4 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
        <div>
          <Label className="text-base font-semibold text-gray-900">Upload Your Plans (Optional)</Label>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Attach up to 3 files (PDF, DWG, JPG, PNG, Excel). Max 10MB per file.
          </p>
        </div>
        
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-blue-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
              <p className="text-sm text-gray-600"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
            </div>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              multiple 
              accept=".pdf,.jpg,.jpeg,.png,.dwg,.xls,.xlsx"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={files.length >= 3}
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2 mt-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={2}
          className="bg-gray-50 resize-none"
          placeholder="Any other details you'd like to share..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting Inquiry...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Inquiry
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted by Synchro Build regarding your project inquiry.
      </p>
    </motion.form>
  );
};

export default InquiryForm;