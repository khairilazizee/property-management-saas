import { Head, Link } from '@inertiajs/react';

type Agent = {
    name: string;
    slug: string;
    renNo?: string | null;
};

type Property = {
    id: number;
    title: string;
    price: string;
    location: string;
    status: string;
    tag: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
};

type PageProps = {
    agent: Agent;
    properties: Property[];
};

export default function PublicAgentProperties({ agent, properties }: PageProps) {
    return (
        <>
            <Head title={`${agent.name} Listings`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=cormorant-garamond:500,600|manrope:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div
                className="min-h-screen bg-[#f6f4f1] text-[#151414]"
                style={{ fontFamily: '"Manrope", ui-sans-serif, system-ui' }}
            >
                <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10 lg:px-10">
                    <header className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_30px_70px_-55px_rgba(10,10,10,0.6)]">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#6f6a64]">
                                    <span className="rounded-full border border-black/10 bg-white px-4 py-2">
                                        Agent portfolio
                                    </span>
                                    <span className="rounded-full border border-black/10 bg-[#efeae2] px-4 py-2 text-[#816a58]">
                                        Verified listings
                                    </span>
                                </div>
                                <h1
                                    className="text-3xl font-semibold leading-tight md:text-5xl"
                                    style={{
                                        fontFamily:
                                            '"Cormorant Garamond", ui-serif, Georgia',
                                    }}
                                >
                                    {agent.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-[#5c5852]">
                                    <span className="rounded-full border border-black/10 bg-white px-4 py-1.5">
                                        @{agent.slug}
                                    </span>
                                    {agent.renNo ? (
                                        <span className="rounded-full border border-black/10 bg-white px-4 py-1.5">
                                            REN {agent.renNo}
                                        </span>
                                    ) : null}
                                    <span className="rounded-full border border-black/10 bg-[#e7efe9] px-4 py-1.5 text-[#2d5945]">
                                        Active now
                                    </span>
                                </div>
                                <p className="max-w-xl text-sm text-[#5c5852] md:text-base">
                                    Curated properties with clear pricing,
                                    location details, and transparent
                                    availability. Contact the agent for viewings
                                    or exclusive previews.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="rounded-full bg-[#151414] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5">
                                    Schedule viewing
                                </button>
                                <button className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-black/80">
                                    WhatsApp agent
                                </button>
                                <Link
                                    href="/"
                                    className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-black/70"
                                >
                                    Back home
                                </Link>
                            </div>
                        </div>
                    </header>

                    <section className="grid gap-6 lg:grid-cols-[1fr_240px]">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-[#7a736c] shadow-[0_18px_45px_-40px_rgba(0,0,0,0.5)]">
                                <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] text-[#8a7e72]">
                                    Filters
                                </span>
                                {[
                                    'All',
                                    'For Sale',
                                    'For Rent',
                                    'Landed',
                                    'Condo',
                                ].map((label) => (
                                    <button
                                        key={label}
                                        className="rounded-full border border-black/10 px-4 py-2 text-[10px] font-semibold text-[#4a433d] transition hover:border-black/30"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                {properties.map((property) => (
                                    <article
                                        key={property.id}
                                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_45px_-35px_rgba(10,10,10,0.5)] transition hover:-translate-y-1"
                                    >
                                        <div className="relative h-48 bg-[linear-gradient(160deg,_#f0ede8_0%,_#e8eef3_50%,_#f3e9e1_100%)]">
                                            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7b6c5f]">
                                                {property.status}
                                            </div>
                                            <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#8b6f55]">
                                                {property.tag}
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-4 p-6">
                                            <div className="text-[11px] uppercase tracking-[0.24em] text-[#8d8174]">
                                                {property.location}
                                            </div>
                                            <h2
                                                className="text-lg font-semibold text-[#15120e]"
                                                style={{
                                                    fontFamily:
                                                        '"Cormorant Garamond", ui-serif, Georgia',
                                                }}
                                            >
                                                {property.title}
                                            </h2>
                                            <p className="text-xl font-semibold text-[#2c2a24]">
                                                {property.price}
                                            </p>
                                            <div className="mt-auto flex items-center gap-4 text-sm text-[#6a6157]">
                                                <span>
                                                    {property.bedrooms} beds
                                                </span>
                                                <span>
                                                    {property.bathrooms} baths
                                                </span>
                                                <span>{property.sqft} sqft</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <aside className="flex flex-col gap-5 rounded-3xl border border-black/10 bg-white p-6 text-sm text-[#5a564f] shadow-[0_22px_50px_-40px_rgba(10,10,10,0.6)]">
                            <h3
                                className="text-xl font-semibold text-[#15120e]"
                                style={{
                                    fontFamily:
                                        '"Cormorant Garamond", ui-serif, Georgia',
                                }}
                            >
                                Agent notes
                            </h3>
                            <p>
                                Focused on move-in ready residences and
                                well-positioned investments across Kuala Lumpur.
                            </p>
                            <div className="rounded-2xl border border-black/10 bg-[#f3efe6] p-4 text-[11px] uppercase tracking-[0.2em] text-[#7b6d61]">
                                Last updated today
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white p-4 text-xs text-[#6c635b]">
                                Preferred viewing slots
                                <span className="mt-2 block text-base font-semibold text-[#15120e]">
                                    11:00 - 19:00
                                </span>
                            </div>
                        </aside>
                    </section>
                </div>
            </div>
        </>
    );
}
