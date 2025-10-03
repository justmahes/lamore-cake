export const Statistics = () => {
    interface statsProps {
        quantity: string;
        description: string;
    }

    const stats: statsProps[] = [
        {
            quantity: "5000+",
            description: "Porsi Terjual",
        },
        {
            quantity: "95%",
            description: "Pelanggan Puas",
        },
        {
            quantity: "15+",
            description: "Varian Jajanan",
        },
        {
            quantity: "2021",
            description: "Berdiri Sejak",
        },
    ];

    return (
        <section id="statistics">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map(({ quantity, description }: statsProps) => (
                    <div key={description} className="flex flex-col items-center gap-2 text-center">
                        <h3 className="text-3xl font-bold tracking-tight text-emerald-700 sm:text-4xl">{quantity}</h3>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
