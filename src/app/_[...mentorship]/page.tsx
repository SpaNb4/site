import { Metadata } from 'next';
import { Mentorship } from '@/views/mentorship.tsx';
import {
  MentorshipCourseRouteKeys,
  MentorshipDefaultRouteKeys,
  mentorshipCourses,
  mentorshipCoursesDefault,
} from 'data';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Mentorship · The Rolling Scopes School`;

  return { title };
}

export const dynamicParams = false;

export async function generateStaticParams():
Promise<{ mentorship: (MentorshipDefaultRouteKeys | MentorshipCourseRouteKeys)[] }[]> {
  return [
    { mentorship: ['mentorship'] },
    { mentorship: ['mentorship', 'reactjs'] },
    { mentorship: ['mentorship', 'angular'] },
    { mentorship: ['mentorship', 'javascript'] },
    { mentorship: ['mentorship', 'javascript-ru'] },
  ];
}

type PageParams = {
  mentorship: (MentorshipDefaultRouteKeys | MentorshipCourseRouteKeys)[];
};

export default async function MentorshipRoute({ params }: { params: PageParams }) {
  const { mentorship } = params;

  const mentorshipCourse = mentorshipCourses.find((item) =>
    item.detailsUrl.includes(`/${mentorship[0]}/${mentorship[1]}`))
  || mentorshipCoursesDefault;

  return <Mentorship mentorshipData={mentorshipCourse} />;
}
