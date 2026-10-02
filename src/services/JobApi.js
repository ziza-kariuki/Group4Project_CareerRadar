const BASE_URL = 'https://jobicy.com/api/v2/remote-jobs';

const normalizeJob = (job) => ({
  ...job,
  id: job.id ?? job.jobId,
  title: job.jobTitle ?? job.title ?? 'Untitled role',
  company: job.companyName ?? job.company ?? 'Company',
  logo: job.companyLogo ?? job.logo ?? '',
  location: job.jobGeo ?? job.location ?? 'Remote',
  level: Array.isArray(job.jobLevel) ? job.jobLevel.join(', ') : job.jobLevel ?? job.level ?? '',
  jobTypes: Array.isArray(job.jobType) ? job.jobType : job.jobType ? [job.jobType] : job.jobTypes ?? [],
  excerpt: job.jobExcerpt ?? job.excerpt ?? '',
  publishedAt: job.pubDate ?? job.publishedAt,
  url: job.url ?? job.jobUrl ?? '',
  salaryMin: job.salaryMin ?? job.salary_min,
  salaryMax: job.salaryMax ?? job.salary_max,
  salaryCurrency: job.salaryCurrency ?? job.salary_currency ?? 'USD',
  industry: Array.isArray(job.jobIndustry ?? job.industry)
    ? (job.jobIndustry ?? job.industry)
    : [job.jobIndustry ?? job.industry].filter(Boolean),
});

export const fetchJobs = async (count = 20, tag = '', signal) => {
  try {
    let url = `${BASE_URL}?count=${count}`;
    if (tag.trim()) {
      url += `&tag=${encodeURIComponent(tag.trim())}`;
    }

    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }

    const data = await response.json();
    return (data.jobs || []).map(normalizeJob);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error fetching jobs:', error.message);
    }
    throw error;
  }
};

export const formatJobDate = (value) => {
  if (!value) return 'Date unavailable';

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Date unavailable'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

export const formatSalaryRange = (job) => {
  if (!job) return 'Salary not specified';

  const minimum = job.salaryMin ?? job.salary_min;
  const maximum = job.salaryMax ?? job.salary_max;
  const currency = job.salaryCurrency ?? job.salary_currency ?? 'USD';
  const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 });

  if (minimum && maximum) return `${formatter.format(minimum)} – ${formatter.format(maximum)}`;
  if (minimum) return `From ${formatter.format(minimum)}`;
  if (maximum) return `Up to ${formatter.format(maximum)}`;
  return 'Salary not specified';
};
