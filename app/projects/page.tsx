import VerticalLine from '@/components/vertical-line';
import LinkButton from '@/components/link-button';
import { CodeBracketIcon } from '@heroicons/react/20/solid';
import disasterClassification from '@/assets/disaster-classification.png';
import feedMeAJob from '@/assets/feed-me-a-job.png';
import autoMuteAds from '@/assets/auto-mute-ads.png';

export default function Projects() {
  return (
    <main>
      {/* Projects */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Projects
          </h3>
          <p className="w-full text-light-neutral-dark max-lg:pb-md max-lg:text-h5-mobile lg:pb-xl lg:text-h5-desktop">
            These are some of the projects you can be involved in as a member of
            the club.
          </p>
          <ul className="flex w-full flex-col gap-md pb-md">
            {[
              {
                img: disasterClassification,
                name: 'Disaster Classification',
                description:
                  'The Disaster Classification team aims to create a model that will accurately determine whether a given tweet is about a natural disaster. After using exploratory data analysis and traditional models to derive an accuracy baseline, the team experimented with LSTM, Keras Embedding, Word2Vec, and BERT. In the future, the team plans to use LSTM for embedding and SVM for output. Jupyter Notebooks and Google Colab are currently being used to create the models.',
              },
              {
                img: feedMeAJob,
                name: 'Feed-Me-A-Job',
                description:
                  "Feed me a job aims to reduce the intricacies of job searching by introducing a search engine that uses ML to give you tailored job postings based on your resume. The search engine would ideally search through most of the world's job search engines at once. Using NLP, we are trying to extract experiences from resumes and match them with job descriptions obtained through APIs. Currently we are researching better models to achieve a good matching accuracy. Besides that we are trying to make this project into a potential product with our application to Y Combinator seeking start-up funding.",
              },
              {
                img: autoMuteAds,
                name: 'Auto Mute Ads',
                description:
                  'This project aims to auto mute advertisements/commercials on youtube. The media streaming on YouTube is taken as input. Video is then segmented into shots and audio which are fed into the classifiers and the end result will be used to mute and unmute the audio. MFCC BoW feature will be used for audio features and visual features such as shot length and presence of text bands will be used along with AWS lambda, S3 , EC2 to bucket the and process the video.',
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex flex-col overflow-clip rounded-md border-line-width border-dashed border-light-neutral-dark bg-light-neutral-gray text-light-background"
                style={{
                  backgroundImage: `url(${item.img.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <details className="flex w-full flex-col bg-[linear-gradient(rgb(var(--color-light-text)),rgb(var(--color-light-text)/0.5))] p-lg">
                  <summary className="cursor-pointer marker:transition-all marker:duration-100 marker:ease-in-out marker:hover:text-[rgb(var(--color-light-background)/0.75)] max-lg:text-h3-mobile lg:text-h3-desktop">
                    &nbsp;&nbsp;
                    {item.name}
                  </summary>
                  <p className="pb-[128px] pt-md">{item.description}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="flex w-full gap-lg pb-lg pt-sm max-lg:flex-col">
            <LinkButton href="/" type="primary">
              <CodeBracketIcon width={20} height={20} />
              Get Involved
            </LinkButton>
          </div>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
