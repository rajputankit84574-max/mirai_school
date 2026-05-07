/**
 * InquiryForm.jsx
 *
 * Exact match of the Mirai Experiential School Inquiry Form document.
 * 9 sections rendered as numbered accordion-style steps.
 *
 * ONLY this component is modified — nothing else in the project changes.
 */
import { useState, useCallback } from 'react'
import { useSubmitEnquiry } from '../api'
import { ingestLead } from '../api/leadIngest'

/* ── Brand constants (read-only, same values as CSS vars) ─────────── */
const B  = '#AA4A44'
const F  = '#77966D'
const FP = '#EFF4ED'
const BP = '#F5ECEA'
const BORDER = '#E7E7E7'

/* ── Choice lists matching the document exactly ───────────────────── */
const GENDER_OPTIONS = [
  { value: 'male',   label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other',  label: 'Other' },
]

const PROGRAM_OPTIONS = [
  { value: 'EYP', label: 'Early Years Programme (EYP)' },
  { value: 'PYP', label: 'Primary Years Programme (PYP)' },
  { value: 'MYP', label: 'Middle Years Programme (MYP)' },
  { value: 'DP',  label: 'Diploma Programme (DP)' },
]

const CURRICULUM_OPTIONS = [
  { value: 'IB',          label: 'IB' },
  { value: 'CBSE',        label: 'CBSE' },
  { value: 'ICSE',        label: 'ICSE' },
  { value: 'IGCSE',       label: 'IGCSE' },
  { value: 'state_board', label: 'State Board' },
  { value: 'other',       label: 'Other' },
]

const INCOME_OPTIONS = [
  { value: 'below_5L',  label: 'Below ₹5L' },
  { value: '5_10L',     label: '₹5L – ₹10L' },
  { value: '10_20L',    label: '₹10L – ₹20L' },
  { value: 'above_20L', label: 'Above ₹20L' },
]

const BOARDING_OPTIONS = [
  { value: 'day',    label: 'Day Scholar' },
  { value: 'weekly', label: 'Weekly Boarding' },
  { value: 'full',   label: 'Full Boarding' },
]

const WHY_MIRAI_OPTIONS = [
  { value: 'ib_curriculum',        label: 'IB Curriculum' },
  { value: 'experiential_learning',label: 'Experiential Learning Model' },
  { value: 'global_exposure',      label: 'Global Exposure' },
  { value: 'boarding_facilities',  label: 'Boarding Facilities' },
  { value: 'infrastructure',       label: 'Infrastructure & Campus' },
  { value: 'recommendation',       label: 'Recommendation' },
  { value: 'social_media',         label: 'Social Media' },
  { value: 'other',                label: 'Other' },
]

const HEARD_OPTIONS = [
  { value: 'website',       label: 'Website' },
  { value: 'instagram',     label: 'Instagram' },
  { value: 'facebook',      label: 'Facebook' },
  { value: 'youtube',       label: 'YouTube' },
  { value: 'education_fair',label: 'Education Fair' },
  { value: 'corporate_rwa', label: 'Corporate / RWA Outreach' },
  { value: 'word_of_mouth', label: 'Word of Mouth' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'other',         label: 'Other' },
]

/* ── Empty form state ─────────────────────────────────────────────── */
const EMPTY = {
  // §1 Student
  academic_session:          '',
  student_full_name:         '',
  student_preferred_name:    '',
  gender:                    '',
  date_of_birth:             '',
  nationality:               '',
  aadhaar_passport_no:       '',
  applying_for_program:      '',
  applying_for_grade:        '',
  current_school_name:       '',
  current_curriculum:        '',
  current_curriculum_other:  '',
  // §2a Father
  father_name:               '',
  father_qualification:      '',
  father_occupation:         '',
  father_organization:       '',
  father_income_bracket:     '',
  father_mobile:             '',
  father_email:              '',
  // §2b Mother
  mother_name:               '',
  mother_qualification:      '',
  mother_occupation:         '',
  mother_organization:       '',
  mother_mobile:             '',
  mother_email:              '',
  // §2c Address
  address_street:            '',
  address_city:              '',
  address_state:             '',
  address_pin:               '',
  // §3 Siblings
  sibling1_name:             '',
  sibling1_grade:            '',
  sibling1_school:           '',
  sibling2_name:             '',
  sibling2_grade:            '',
  sibling2_school:           '',
  // §4 Boarding
  boarding_type:             'day',
  boarding_special_considerations: '',
  // §5 Profile
  student_strengths_interests:  '',
  awards_recognitions:          '',
  learning_support_required:    false,
  learning_support_details:     '',
  medical_conditions_allergies: '',
  // §6 Why Mirai — stored as array internally, joined to CSV on submit
  why_mirai_reasons:  [],   // array of selected values
  why_mirai_other:    '',
  school_expectations:'',
  // §7 Transport
  transport_required:         false,
  transport_pickup_location:  '',
  // §8
  ib_awareness:               '',
  heard_via:      [],         // array of selected values
  heard_via_other:'',
  // §9
  declaration_accepted: false,
  declaration_date:     '',
  whatsapp_consent:     true, // Default to true for better conversion
}

/* ── Small reusable primitives ────────────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="block text-xs font-bold mb-1.5"
           style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>
      {children}
      {required && <span style={{ color: B, marginLeft: 3 }}>*</span>}
    </label>
  )
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-xs mt-1" style={{ color: '#E05252' }}>{msg}</p>
}

function Input({ name, value, onChange, type = 'text', placeholder, required, error, ...rest }) {
  return (
    <>
      <input
        type={type} name={name} value={value}
        onChange={onChange} placeholder={placeholder}
        required={required}
        className={`form-input${error ? ' error' : ''}`}
        style={{ fontFamily: 'var(--font-body)' }}
        {...rest}
      />
      <FieldError msg={error} />
    </>
  )
}

function Select({ name, value, onChange, options, placeholder, required, error }) {
  return (
    <>
      <select name={name} value={value} onChange={onChange} required={required}
              className={`form-input${error ? ' error' : ''}`}
              style={{ fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
        <option value="">{placeholder || 'Select…'}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <FieldError msg={error} />
    </>
  )
}

function Textarea({ name, value, onChange, placeholder, rows = 3, error }) {
  return (
    <>
      <textarea name={name} value={value} onChange={onChange}
                placeholder={placeholder} rows={rows}
                className={`form-input${error ? ' error' : ''}`}
                style={{ fontFamily: 'var(--font-body)', resize: 'vertical' }} />
      <FieldError msg={error} />
    </>
  )
}

function Radio({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer text-sm py-1"
           style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>
      <input type="radio" name={name} value={value} checked={checked}
             onChange={onChange}
             style={{ accentColor: B, width: 16, height: 16, cursor: 'pointer' }} />
      {label}
    </label>
  )
}

function Checkbox({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer text-sm py-1"
           style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>
      <input type="checkbox" name={name} value={value} checked={checked}
             onChange={onChange}
             style={{ accentColor: B, width: 16, height: 16, cursor: 'pointer' }} />
      {label}
    </label>
  )
}

/* ── Section header ───────────────────────────────────────────────── */
function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3"
         style={{ borderBottom: `2px solid ${BP}` }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
           style={{ background: B, fontFamily: 'var(--font-display)' }}>
        {number}
      </div>
      <h3 className="font-display font-800 text-lg"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#1C1917' }}>
        {title}
      </h3>
    </div>
  )
}

/* ── 2-column grid helper ─────────────────────────────────────────── */
function Grid2({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
      {children}
    </div>
  )
}

function FormSection({ children, last }) {
  return (
    <div className="p-7 md:p-10"
         style={{ borderBottom: last ? 'none' : `1px solid #F0EDEA` }}>
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN FORM COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function InquiryForm() {
  const [form, setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const mutation = useSubmitEnquiry()

  /* ── Generic field change handler ─────────────────────────────── */
  const handle = useCallback(e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' && name !== 'why_mirai_reasons' && name !== 'heard_via'
        ? checked
        : value,
    }))
    // Clear error on change
    if (errors[name]) setErrors(prev => { const n = {...prev}; delete n[name]; return n })
  }, [errors])

  /* ── Multi-checkbox handler (why_mirai_reasons, heard_via) ────── */
  const handleMultiCheck = useCallback((fieldName, value, checked) => {
    setForm(f => {
      const current = f[fieldName]
      return {
        ...f,
        [fieldName]: checked
          ? [...current, value]
          : current.filter(v => v !== value),
      }
    })
  }, [])

  /* ── Client-side validation ───────────────────────────────────── */
  const validate = () => {
    const errs = {}
    // FIXED: reusable regex constants defined once
    const letters  = /^[A-Za-z\s]+$/
    const alphanum = /^[A-Za-z0-9]+$/
    const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRe = /^\d{10}$/
    const pinRe    = /^\d{6}$/

    // §1 Student Information — FIXED: strict rules per spec
    const sname = form.student_full_name.trim()
    if (!sname)                             errs.student_full_name = 'Full name is required'
    else if (!letters.test(sname))          errs.student_full_name = 'Letters and spaces only'
    else if (sname.length < 3)             errs.student_full_name = 'Minimum 3 characters'

    if (!form.date_of_birth) {
      errs.date_of_birth = 'Date of birth is required'
    } else if (new Date(form.date_of_birth) >= new Date()) {
      errs.date_of_birth = 'Date of birth cannot be in the future'
    }

    if (!form.gender)             errs.gender             = 'Gender is required'
    if (!form.nationality.trim()) errs.nationality        = 'Nationality is required'

    // FIXED: aadhaar_passport_no — required + alphanumeric
    const pid = form.aadhaar_passport_no.trim()
    if (!pid)                    errs.aadhaar_passport_no = 'Aadhaar / Passport number is required'
    else if (!alphanum.test(pid)) errs.aadhaar_passport_no = 'Alphanumeric characters only'

    if (!form.applying_for_program) errs.applying_for_program = 'Programme selection is required'

    // FIXED: current_school_name — required
    if (!form.current_school_name.trim()) errs.current_school_name = 'Current school name is required'

    // §2a Father — FIXED: strict rules
    const fname = form.father_name.trim()
    if (!fname)                    errs.father_name = "Father's name is required"
    else if (!letters.test(fname)) errs.father_name = 'Letters only'

    const fmob = form.father_mobile.replace(/\D/g, '')
    if (!form.father_mobile.trim())   errs.father_mobile = 'Mobile number is required'
    else if (!mobileRe.test(fmob))    errs.father_mobile = 'Must be exactly 10 digits'

    if (!form.father_email.trim())            errs.father_email = 'Email is required'
    else if (!emailRe.test(form.father_email)) errs.father_email = 'Invalid email format'

    // FIXED: father_income_bracket — required selection
    if (!form.father_income_bracket) errs.father_income_bracket = 'Income bracket is required'

    // §2b Mother — validate format only if filled
    if (form.mother_name.trim() && !letters.test(form.mother_name.trim()))
      errs.mother_name = 'Letters only'
    if (form.mother_mobile.trim() && !mobileRe.test(form.mother_mobile.replace(/\D/g,'')))
      errs.mother_mobile = 'Must be exactly 10 digits'
    if (form.mother_email.trim() && !emailRe.test(form.mother_email))
      errs.mother_email = 'Invalid email format'

    // §2c Address — FIXED: letters-only on city/state
    if (!form.address_street.trim()) errs.address_street = 'Street address is required'

    const city = form.address_city.trim()
    if (!city)                    errs.address_city = 'City is required'
    else if (!letters.test(city)) errs.address_city = 'Letters only'

    const state = form.address_state.trim()
    if (!state)                    errs.address_state = 'State is required'
    else if (!letters.test(state)) errs.address_state = 'Letters only'

    if (!form.address_pin.trim())              errs.address_pin = 'PIN code is required'
    else if (!pinRe.test(form.address_pin.trim())) errs.address_pin = 'Must be exactly 6 digits'

    // §5 Conditional
    if (form.learning_support_required && !form.learning_support_details.trim())
      errs.learning_support_details = 'Please specify the support required'

    // §7 Conditional
    if (form.transport_required && !form.transport_pickup_location.trim())
      errs.transport_pickup_location = 'Pickup location is required'

    // §8 Source — FIXED: at least one required
    if (!form.heard_via.length) errs.heard_via = 'Please select at least one source'

    // §9 Declaration
    if (!form.declaration_accepted) errs.declaration_accepted = 'You must accept the declaration'

    return errs
  }

  /* ── Submit ───────────────────────────────────────────────────── */
  const submit = e => {
    e.preventDefault()
    setSuccess(null)

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll to first error
      const firstErrEl = document.querySelector('.form-input.error, [data-err]')
      firstErrEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // Serialize multi-select arrays to comma-separated strings for API
    const payload = {
      ...form,
      why_mirai_reasons: form.why_mirai_reasons.join(','),
      heard_via:         form.heard_via.join(','),
    }

    mutation.mutate(payload, {
      onSuccess: data => {
        // Trigger external lead ingest
        ingestLead({
          child_name:       payload.student_full_name,
          parent_name:      payload.father_name,
          mobile_number:    payload.father_mobile,
          email:            payload.father_email,
          child_dob:        payload.date_of_birth,
          looking_for:      payload.applying_for_program,
          whatsapp_consent: payload.whatsapp_consent,
        })

        setSuccess(data.message)
        setForm(EMPTY)
        setErrors({})
        mutation.reset()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
      onError: err => {
        if (err.isValidationError) {
          setErrors(err.fieldErrors)
        }
      },
    })
  }

  /* ── Server errors ────────────────────────────────────────────── */
  const fe = errors
  const serverError = mutation.isError && !mutation.error?.isValidationError
    ? (mutation.error?.message ?? 'Submission failed. Please try again.')
    : null

  /* ════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════ */
  return (
    <div className="bg-white rounded-3xl overflow-hidden"
         style={{ border: `1.5px solid #F0EDEA`, boxShadow: '0 8px 40px rgba(170,74,68,0.08)' }}>

      {/* Form header */}
      <div className="px-7 md:px-10 py-8"
           style={{ background: `linear-gradient(145deg, #2D1210, ${B})` }}>
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Mirai"
            style={{
              height: 'auto',
              maxHeight: 64,
              width: 'auto',
              maxWidth: 180,
              objectFit: 'contain',
              display: 'block',
              filter: 'brightness(10)',
            }}
          />
          <div>
            <h2 className="font-display font-800 text-2xl text-white"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              School Inquiry Form
            </h2>
            <p id="academic-session-header" className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
              Academic Session ______ · All fields marked <span style={{ color: '#FFAAAA' }}>*</span> are required
            </p>
          </div>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className="mx-7 md:mx-10 mt-6 rounded-2xl p-5 flex items-start gap-3"
             style={{ background: FP, border: `1px solid ${F}44` }}>
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-sm" style={{ color: F, fontFamily: 'var(--font-display)' }}>
              ✅ Inquiry submitted successfully!{/* FIXED: updated success text */}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>
              {success} Our admissions team will contact you within 24 hours.{/* FIXED */}
            </p>
          </div>
        </div>
      )}

      {/* Server error */}
      {serverError && (
        <div className="mx-7 md:mx-10 mt-6 rounded-2xl p-4"
             style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
          <p className="text-sm" style={{ color: '#E05252', fontFamily: 'var(--font-body)' }}>
            {serverError}
          </p>
        </div>
      )}

      <form onSubmit={submit} noValidate>

        {/* ══ §1 STUDENT INFORMATION ════════════════════════════════ */}
        <FormSection>
          <SectionHeading number="1" title="Student Information" />
          <div className="mb-5">
            <Label required>Student's Full Name (as per Birth Certificate)</Label>
            <Input name="student_full_name" value={form.student_full_name}
                   onChange={handle} placeholder="Full name as per birth certificate"
                   required error={fe.student_full_name} />
          </div>
          <div className="mb-5">
            <Label>Preferred Name (if any)</Label>
            <Input name="student_preferred_name" value={form.student_preferred_name}
                   onChange={handle} placeholder="What the student likes to be called" />
          </div>
          <Grid2>
            <div>
              <Label required>Gender</Label>
              <div className="flex gap-5 mt-2" data-err>
                {GENDER_OPTIONS.map(o => (
                  <Radio key={o.value} name="gender" value={o.value}
                         checked={form.gender === o.value}
                         onChange={handle} label={o.label} />
                ))}
              </div>
              <FieldError msg={fe.gender} />
            </div>
            <div>
              <Label required>Date of Birth (DD/MM/YYYY)</Label>
              <Input name="date_of_birth" value={form.date_of_birth}
                     onChange={handle} type="date" required error={fe.date_of_birth} />
            </div>
            <div>
              <Label required>Nationality</Label>
              <Input name="nationality" value={form.nationality}
                     onChange={handle} placeholder="e.g. Indian" required error={fe.nationality} />
            </div>
            <div>
              <Label required>Aadhaar / Passport No.</Label>{/* FIXED: required marker */}
              <Input name="aadhaar_passport_no" value={form.aadhaar_passport_no}
                     onChange={handle} placeholder="ID number" error={fe.aadhaar_passport_no} />{/* FIXED: error prop */}
            </div>
          </Grid2>

          <div className="mt-5 mb-5">
            <Label required>Applying for Programme</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {PROGRAM_OPTIONS.map(o => (
                <Radio key={o.value} name="applying_for_program" value={o.value}
                       checked={form.applying_for_program === o.value}
                       onChange={handle} label={o.label} />
              ))}
            </div>
            <FieldError msg={fe.applying_for_program} />
          </div>

          {form.applying_for_program && form.applying_for_program !== 'EYP' && (
            <div className="mb-5" style={{ maxWidth: 240 }}>
              <Label>Grade (within programme)</Label>
              <Input name="applying_for_grade" value={form.applying_for_grade}
                     onChange={handle} placeholder="e.g. Grade 6" />
            </div>
          )}

          <Grid2>
            <div>
              <Label required>Current School Name</Label>{/* FIXED: required marker */}
              <Input name="current_school_name" value={form.current_school_name}
                     onChange={handle} placeholder="School name" error={fe.current_school_name} />{/* FIXED: error prop */}
            </div>
            <div>
              <Label>Current Curriculum</Label>
              <Select name="current_curriculum" value={form.current_curriculum}
                      onChange={handle} options={CURRICULUM_OPTIONS}
                      placeholder="Select curriculum" />
            </div>
          </Grid2>
          {form.current_curriculum === 'other' && (
            <div className="mt-4">
              <Label>Specify Current Curriculum</Label>
              <Input name="current_curriculum_other" value={form.current_curriculum_other}
                     onChange={handle} placeholder="Please specify" />
            </div>
          )}
        </FormSection>

        {/* ══ §2 PARENT / GUARDIAN DETAILS ════════════════════════ */}
        <FormSection>
          <SectionHeading number="2" title="Parent / Guardian Details" />

          {/* Father */}
          <div className="mb-6 pb-6" style={{ borderBottom: `1px dashed ${BORDER}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4"
               style={{ color: B, fontFamily: 'var(--font-display)' }}>Father's Details</p>
            <div className="mb-4">
              <Label required>Full Name</Label>
              <Input name="father_name" value={form.father_name}
                     onChange={handle} placeholder="Father's full name"
                     required error={fe.father_name} />
            </div>
            <Grid2>
              <div>
                <Label>Qualification</Label>
                <Input name="father_qualification" value={form.father_qualification}
                       onChange={handle} placeholder="e.g. MBA, B.Tech" />
              </div>
              <div>
                <Label>Occupation / Designation</Label>
                <Input name="father_occupation" value={form.father_occupation}
                       onChange={handle} placeholder="Job title or role" />
              </div>
              <div>
                <Label>Organization / Business Name</Label>
                <Input name="father_organization" value={form.father_organization}
                       onChange={handle} placeholder="Employer or business" />
              </div>
              <div>
                <Label required>Annual Income Bracket</Label>{/* FIXED: required marker */}
                <Select name="father_income_bracket" value={form.father_income_bracket}
                        onChange={handle} options={INCOME_OPTIONS}
                        placeholder="Select range" error={fe.father_income_bracket} />{/* FIXED: error prop */}
              </div>
              <div>
                <Label required>Mobile No.</Label>
                <Input name="father_mobile" value={form.father_mobile}
                       onChange={handle} type="tel" placeholder="+91 XXXXX XXXXX"
                       required error={fe.father_mobile} />
              </div>
              <div>
                <Label required>Email ID</Label>
                <Input name="father_email" value={form.father_email}
                       onChange={handle} type="email" placeholder="father@email.com"
                       required error={fe.father_email} />
              </div>
            </Grid2>
          </div>

          {/* Mother */}
          <div className="mb-6 pb-6" style={{ borderBottom: `1px dashed ${BORDER}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4"
               style={{ color: F, fontFamily: 'var(--font-display)' }}>Mother's Details</p>
            <div className="mb-4">
              <Label>Full Name</Label>
              <Input name="mother_name" value={form.mother_name}
                     onChange={handle} placeholder="Mother's full name" />
            </div>
            <Grid2>
              <div>
                <Label>Qualification</Label>
                <Input name="mother_qualification" value={form.mother_qualification}
                       onChange={handle} placeholder="e.g. M.A., B.Sc." />
              </div>
              <div>
                <Label>Occupation / Designation</Label>
                <Input name="mother_occupation" value={form.mother_occupation}
                       onChange={handle} placeholder="Job title or role" />
              </div>
              <div>
                <Label>Organization / Business Name</Label>
                <Input name="mother_organization" value={form.mother_organization}
                       onChange={handle} placeholder="Employer or business" />
              </div>
              <div>
                <Label>Mobile No.</Label>
                <Input name="mother_mobile" value={form.mother_mobile}
                       onChange={handle} type="tel" placeholder="+91 XXXXX XXXXX"
                       error={fe.mother_mobile} />
              </div>
              <div>
                <Label>Email ID</Label>
                <Input name="mother_email" value={form.mother_email}
                       onChange={handle} type="email" placeholder="mother@email.com"
                       error={fe.mother_email} />
              </div>
            </Grid2>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4"
               style={{ color: '#44403C', fontFamily: 'var(--font-display)' }}>Residential Address</p>
            <div className="mb-4">
              <Label required>House No. / Street</Label>
              <Textarea name="address_street" value={form.address_street}
                        onChange={handle} rows={2}
                        placeholder="House / flat number, street name, locality"
                        error={fe.address_street} />
            </div>
            <Grid2>
              <div>
                <Label required>City</Label>
                <Input name="address_city" value={form.address_city}
                       onChange={handle} placeholder="City" required error={fe.address_city} />
              </div>
              <div>
                <Label required>State</Label>
                <Input name="address_state" value={form.address_state}
                       onChange={handle} placeholder="State" required error={fe.address_state} />
              </div>
              <div>
                <Label required>PIN Code</Label>
                <Input name="address_pin" value={form.address_pin}
                       onChange={handle} placeholder="6-digit PIN" required
                       maxLength={6} error={fe.address_pin} />
              </div>
            </Grid2>
          </div>
        </FormSection>

        {/* ══ §3 SIBLING INFORMATION ══════════════════════════════ */}
        <FormSection>
          <SectionHeading number="3" title="Sibling Information (If Applicable)" />
          <p className="text-sm mb-5" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
            If the student has siblings currently in school, please provide their details.
          </p>
          {[1, 2].map(n => (
            <div key={n} className="mb-4">
              <p className="text-xs font-semibold mb-2"
                 style={{ color: '#78716C', fontFamily: 'var(--font-display)' }}>
                Sibling {n}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                <div>
                  <Label>Name</Label>
                  <Input name={`sibling${n}_name`} value={form[`sibling${n}_name`]}
                         onChange={handle} placeholder="Full name" />
                </div>
                <div>
                  <Label>Grade</Label>
                  <Input name={`sibling${n}_grade`} value={form[`sibling${n}_grade`]}
                         onChange={handle} placeholder="e.g. Grade 5" />
                </div>
                <div>
                  <Label>School</Label>
                  <Input name={`sibling${n}_school`} value={form[`sibling${n}_school`]}
                         onChange={handle} placeholder="School name" />
                </div>
              </div>
            </div>
          ))}
        </FormSection>

        {/* ══ §4 BOARDING REQUIREMENT ═════════════════════════════ */}
        <FormSection>
          <SectionHeading number="4" title="Boarding Requirement" />
          <div className="mb-4">
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {BOARDING_OPTIONS.map(o => (
                <Radio key={o.value} name="boarding_type" value={o.value}
                       checked={form.boarding_type === o.value}
                       onChange={handle} label={o.label} />
              ))}
            </div>
          </div>
          {(form.boarding_type === 'weekly' || form.boarding_type === 'full') && (
            <div>
              <Label>Special Considerations for Boarding</Label>
              <Textarea name="boarding_special_considerations"
                        value={form.boarding_special_considerations}
                        onChange={handle} rows={3}
                        placeholder="Dietary restrictions, medical needs, room preferences…" />
            </div>
          )}
        </FormSection>

        {/* ══ §5 STUDENT PROFILE & INTERESTS ══════════════════════ */}
        <FormSection>
          <SectionHeading number="5" title="Student Profile & Interests" />
          <div className="mb-5">
            <Label>Student's Strengths / Interests</Label>
            <Textarea name="student_strengths_interests"
                      value={form.student_strengths_interests}
                      onChange={handle} rows={3}
                      placeholder="Sports, Arts, Music, STEM, Leadership, etc." />
          </div>
          <div className="mb-5">
            <Label>Awards or Recognitions Received</Label>
            <Textarea name="awards_recognitions" value={form.awards_recognitions}
                      onChange={handle} rows={2}
                      placeholder="State / national competitions, prizes, certificates…" />
          </div>

          <div className="mb-4">
            <Label>Any Learning Support Requirements?</Label>
            <div style={{ display: 'flex', gap: 28, marginTop: 8 }}>
              <Radio name="learning_support_required" value="false"
                     checked={!form.learning_support_required}
                     onChange={() => setForm(f => ({ ...f, learning_support_required: false }))}
                     label="No" />
              <Radio name="learning_support_required" value="true"
                     checked={form.learning_support_required}
                     onChange={() => setForm(f => ({ ...f, learning_support_required: true }))}
                     label="Yes" />
            </div>
          </div>
          {form.learning_support_required && (
            <div className="mb-4">
              <Label required>Please Specify Learning Support Required</Label>
              <Textarea name="learning_support_details" value={form.learning_support_details}
                        onChange={handle} rows={2}
                        placeholder="Type of support, diagnosis, current interventions…"
                        error={fe.learning_support_details} />
            </div>
          )}

          <div>
            <Label>Medical Conditions / Allergies (if any)</Label>
            <Textarea name="medical_conditions_allergies"
                      value={form.medical_conditions_allergies}
                      onChange={handle} rows={2}
                      placeholder="Known allergies, chronic conditions, medications…" />
          </div>
        </FormSection>

        {/* ══ §6 WHY MIRAI? ════════════════════════════════════════ */}
        <FormSection>
          <SectionHeading number="6" title="Why Mirai?" />
          <div className="mb-5">
            <Label>What inspired you to consider Mirai Experiential School?</Label>
            <p className="text-xs mb-3" style={{ color: '#A8A29E', fontFamily: 'var(--font-body)' }}>
              Select all that apply
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 4 }}>
              {WHY_MIRAI_OPTIONS.map(o => (
                <Checkbox key={o.value}
                          name="why_mirai_reasons"
                          value={o.value}
                          checked={form.why_mirai_reasons.includes(o.value)}
                          onChange={e => handleMultiCheck('why_mirai_reasons', o.value, e.target.checked)}
                          label={o.label} />
              ))}
            </div>
          </div>
          {form.why_mirai_reasons.includes('other') && (
            <div className="mb-4">
              <Label>Please specify</Label>
              <Input name="why_mirai_other" value={form.why_mirai_other}
                     onChange={handle} placeholder="Tell us more…" />
            </div>
          )}
          <div>
            <Label>What are your expectations from the school?</Label>
            <Textarea name="school_expectations" value={form.school_expectations}
                      onChange={handle} rows={3}
                      placeholder="Academic outcomes, extracurricular opportunities, values…" />
          </div>
        </FormSection>

        {/* ══ §7 TRANSPORT REQUIREMENT ═════════════════════════════ */}
        <FormSection>
          <SectionHeading number="7" title="Transport Requirement" />
          <div className="mb-4">
            <div style={{ display: 'flex', gap: 28 }}>
              <Radio name="transport_required" value="false"
                     checked={!form.transport_required}
                     onChange={() => setForm(f => ({ ...f, transport_required: false, transport_pickup_location: '' }))}
                     label="No" />
              <Radio name="transport_required" value="true"
                     checked={form.transport_required}
                     onChange={() => setForm(f => ({ ...f, transport_required: true }))}
                     label="Yes" />
            </div>
          </div>
          {form.transport_required && (
            <div>
              <Label required>Pickup Location</Label>
              <Input name="transport_pickup_location"
                     value={form.transport_pickup_location}
                     onChange={handle}
                     placeholder="Full pickup address / area"
                     required error={fe.transport_pickup_location} />
            </div>
          )}
        </FormSection>

        {/* ══ §8 IB AWARENESS + HOW DID YOU HEAR ABOUT US ═════════ */}
        <FormSection>
          <SectionHeading number="8" title="IB Awareness & How You Found Us" />
          <div className="mb-6">
            <Label>How much do you know about the IB curriculum?</Label>
            <Textarea name="ib_awareness" value={form.ib_awareness}
                      onChange={handle} rows={3}
                      placeholder="Share your understanding of the IB programme, its philosophy, and benefits…" />
          </div>
          <div>
            <Label>How did you hear about Mirai Experiential School?</Label>
            <p className="text-xs mb-3" style={{ color: '#A8A29E', fontFamily: 'var(--font-body)' }}>
              Select all that apply
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 4 }}>
              {HEARD_OPTIONS.map(o => (
                <Checkbox key={o.value}
                          name="heard_via"
                          value={o.value}
                          checked={form.heard_via.includes(o.value)}
                          onChange={e => handleMultiCheck('heard_via', o.value, e.target.checked)}
                          label={o.label} />
              ))}
            </div>
            <FieldError msg={fe.heard_via} />{/* FIXED: source required error */}
            {form.heard_via.includes('other') && (
              <div className="mt-3">
                <Label>Please specify</Label>
                <Input name="heard_via_other" value={form.heard_via_other}
                       onChange={handle} placeholder="How did you hear about us?" />
              </div>
            )}
          </div>
        </FormSection>

        {/* ══ §9 DECLARATION ════════════════════════════════════════ */}
        <FormSection last>
          <SectionHeading number="9" title="Declaration" />
          <div className="rounded-2xl p-5 mb-5"
               style={{ background: '#FAFAF8', border: `1px solid ${BORDER}` }}>
            <p className="text-sm leading-relaxed" style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>
              I/We hereby declare that the information provided above is true and accurate to the best of our
              knowledge. Submission of this inquiry form does not guarantee admission and is subject to the
              school's admission policy and IB guidelines.
            </p>
          </div>
          <Grid2>
            <div className="md:col-span-2">
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl transition-all hover:bg-stone-50"
                     style={{ border: fe.declaration_accepted ? `1.5px solid ${B}` : `1.5px solid transparent` }}>
                <input type="checkbox"
                       name="declaration_accepted"
                       checked={form.declaration_accepted}
                       onChange={e => setForm(f => ({ ...f, declaration_accepted: e.target.checked }))}
                       style={{ accentColor: B, width: 20, height: 20, marginTop: 2, cursor: 'pointer', flexShrink: 0 }} />
                <div>
                  <span className="text-sm font-bold block mb-1" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>
                    I/We accept the above declaration <span style={{ color: B }}>*</span>
                  </span>
                  <p className="text-xs" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
                    I hereby declare that all information provided is true and accurate.
                  </p>
                </div>
              </label>
              <FieldError msg={fe.declaration_accepted} />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl transition-all hover:bg-stone-50">
                <input type="checkbox"
                       name="whatsapp_consent"
                       checked={form.whatsapp_consent}
                       onChange={e => setForm(f => ({ ...f, whatsapp_consent: e.target.checked }))}
                       style={{ accentColor: F, width: 20, height: 20, marginTop: 2, cursor: 'pointer', flexShrink: 0 }} />
                <div>
                  <span className="text-sm font-bold block mb-1" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>
                    WhatsApp Consent
                  </span>
                  <p className="text-xs" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
                    I consent to receiving school updates and admissions information via WhatsApp.
                  </p>
                </div>
              </label>
            </div>
          </Grid2>
        </FormSection>

        {/* ══ SUBMIT ════════════════════════════════════════════════ */}
        <div className="px-7 md:px-10 py-7"
             style={{ borderTop: `2px solid ${BP}`, background: '#FAFAF8' }}>
          {Object.keys(errors).length > 0 && (
            <div className="rounded-xl p-4 mb-4"
                 style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <p className="text-sm font-semibold" style={{ color: '#E05252', fontFamily: 'var(--font-display)' }}>
                Please fix the highlighted errors before submitting.
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-primary btn-lg w-full justify-center"
            style={{ width: '100%' }}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 rounded-full animate-spin flex-shrink-0"
                      style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                Submitting Inquiry…
              </span>
            ) : (
              'Submit Inquiry Form →'
            )}
          </button>
          <p className="text-xs text-center mt-3" style={{ color: '#A8A29E', fontFamily: 'var(--font-body)' }}>
            Our admissions team will contact you within 24 hours of submission.
          </p>
        </div>
      </form>
    </div>
  )
}
