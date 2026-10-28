export const siteConfig = {
  name: 'ProjectForge AI',
  phoneDisplay: '+91 80105 99511',
  phoneHref: 'tel:+918010599511',
  whatsappHref: 'https://wa.me/918010599511',
  description: 'Engineering projects, research-ready implementations, and technical guidance for ambitious students.',
}

export function getWhatsAppHref(projectTitle = 'a project', academicLevel = 'my academic level', inquiryType = 'project inquiry') {
  const message = `Hi, I am interested in ${projectTitle} for ${academicLevel}. Please share the scope, available deliverables, pricing, and timeline. Inquiry type: ${inquiryType}.`
  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`
}
