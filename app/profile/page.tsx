import ContactForm from "@/components/ContactForm";
import { fetchProfile } from "@/lib/notion";

export const revalidate = 60;

export default async function ProfilePage() {
    const profileItems = await fetchProfile();

    return (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                    <div>
                        <h1 className="text-5xl font-bold mb-6">About the Artist</h1>
                        <div className="prose prose-lg text-gray-600 leading-relaxed text-lg">
                            <p>
                                Johnny Boy is an artist based in Seoul, known for his vibrant usage of red and chaotic yet structured compositions.
                                His work invites viewers to question the stability of perception and the fluidity of emotion.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold border-b border-black pb-4 uppercase tracking-widest">Selected Works & Exhibitions</h2>
                        <div className="space-y-8">
                            {profileItems.length > 0 ? (
                                profileItems.map((item) => (
                                    <div key={item.id} className="group relative border-l-2 border-gray-200 pl-6 hover:border-primary transition-colors duration-300">
                                        <span className="text-xs font-bold text-gray-400 group-hover:text-primary uppercase tracking-wider block mb-1 transition-colors">{item.year}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.category}</h3>
                                        <p className="text-base text-gray-600">{item.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No profile info available.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sticky top-32">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
