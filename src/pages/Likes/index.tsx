import { Post } from "data/nasa/types";
import PageContent from "components/PageContent";
import PostPreviewCard from "components/PostPreviewCard";

type Data = Post & { liked: boolean };

export default function Likes() {
  // TODO: Replace mock data with real data
  const data: Data[] = [
    {
      date: "2025-04-12",
      explanation:
        "Most of us watch the Moon at night. But the Moon spends nearly as many daylight hours above our horizon, though in bright daytime skies the lunar disk looks pale and can be a little harder to see. Of course in daytime skies the Moon also appears to cycle through its phases, shining by reflected sunlight as it orbits our fair planet. For daytime moonwatchers, the Moon is probably easier to spot when the visible sunlit portion of the lunar disk is large and waxing following first quarter or waning approaching its third quarter phase. And though it might look unusual, a daytime moon is often seen even in urban skies. Captured here in a telephoto snapshot taken on March 12, a waxing daytime Moon is aligned near the edge of a popular observation deck that overlooks New York City's borough of Manahattan.",
      media_type: "image",
      title: "Moon Near the Edge",
      url: "https://apod.nasa.gov/apod/image/2504/PlataformaRecorteHorizontalRedes1024.jpg",
      liked: true,
    },
    {
      date: "2025-04-11",
      explanation:
        "Made with a telescope shaded from bright sunlight by an umbrella, on April 5 a well-planned video captured a crescent Venus shining in clear daytime skies from Shoreline, Washington, USA at 11:57AM Pacific Time. It also caught the International Space Station in this single video frame. In close conjunction with the bright planet, the faint outline of the orbital outpost seen at a range of about 400 kilometers appears to be similar in size to the slender planetary crescent. Of course the ISS is much smaller than Venus. Now appearing as planet Earth's brilliant morning star and climbing above the eastern horizon in predawn skies, inner planet Venus was nearly 45 million kilometers from Shoreline.",
      media_type: "image",
      title: "The ISS Meets Venus",
      url: "https://apod.nasa.gov/apod/image/2504/Venus-ISSsingleframe1100c.jpeg",
      liked: true,
    },
    {
      date: "2025-04-10",
      explanation:
        "From a garden on planet Earth, 38 hours of exposure with a camera and small telescope produced this cosmic photo of the M81 galaxy group. In fact, the group's dominant galaxy M81 is near the center of the frame sporting grand spiral arms and a bright yellow core. Also known as Bode's galaxy, M81 itself spans some 100,000 light-years. Near the top is cigar-shaped irregular galaxy M82.  The pair have been locked in gravitational combat for a billion years. Gravity from each galaxy has profoundly affected the other during a series of cosmic close encounters.  Their last go-round lasted about 100 million years and likely raised density waves rippling around M81, resulting in massive star forming regions arrayed along M81's spiral arms.  M82 was left with violent star forming regions too, and colliding gas clouds so energetic that the galaxy glows in X-rays.  In the next few billion years, their continuing gravitational encounters will result in a merger, and a single galaxy will remain. Another group member, NGC 3077 is below and left of the large spiral M81. Far far away, about 12 million light-years distant the M81 group galaxies are seen toward the northern constellation Ursa Major (the Great Bear). But in the closer foreground the wide-field image is filled with integrated flux nebulae whose faint, dusty interstellar clouds reflect starlight above the plane of our own Milky Way galaxy.",
      media_type: "image",
      title: "38 Hours with the M81 Group",
      url: "https://apod.nasa.gov/apod/image/2504/38h_M81-group_1024.jpeg",
      liked: true,
    },
    {
      date: "2025-04-09",
      explanation:
        "What's at the tip of this interstellar jet?  First let's consider the jet: it is being expelled by a star system just forming and is cataloged as Herbig-Haro 49 (HH 49).  The star system expelling this jet is not visible -- it is off to the lower right.  The complex conical structure featured in this infrared image by the James Webb Space Telescope also includes another jet cataloged as HH 50.  The fast jet particles impact the surrounding interstellar gas and form shock waves that glow prominently in infrared light -- shown here as reddish-brown ridges.  This JWST image also resolved the mystery of the unusual object at HH 49's tip: it is a spiral galaxy far in the distance.  The blue center is therefore not one star but many, and the surrounding circular rings are actually spiral arms.   Jump Around the Universe: Random APOD Generator",
      media_type: "image",
      title: "HH 49: Interstellar Jet from Webb",
      url: "https://apod.nasa.gov/apod/image/2504/HH49_Webb_960.jpg",
      liked: true,
    },
  ];

  return (
    <PageContent>
      <section className="mx-auto grid max-w-4xl grid-cols-3 gap-1 min-md:gap-6">
        {data.map((post) => {
          if (!post.liked) return null;
          return <PostPreviewCard post={post} key={post.date} />;
        })}
      </section>
    </PageContent>
  );
}
