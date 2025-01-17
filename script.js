const emojiPluginEmployment = {
    id: 'emojiPluginEmployment',
    beforeTooltipDraw: (chart, args, options) => {
        if (chart.tooltip?.active) return;
        
        const ctx = chart.ctx;
        const categories = ['Actifs ayant un emploi', 'Nombre d\'emplois'];
        
        categories.forEach((category, index) => {
            chart.data.datasets.forEach((dataset, yearIndex) => {
                const meta = chart.getDatasetMeta(yearIndex);
                // Vérifie si le dataset est visible en utilisant la propriété hidden
                if (meta.hidden) return;
                
                const element = meta.data[index];
                const model = element;
                
                const centerX = model.x;
                const centerY = model.y + model.height / 2;
                
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const emoji = index === 0 ? '💼' : '👔';
                
                const fontSize = Math.min(model.width, 25);
                ctx.font = `${fontSize}px Arial`;
                
                ctx.globalAlpha = 1;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 3;
                ctx.fillStyle = 'white';
                
                ctx.fillText(emoji, 0, 0);
                
                if (yearIndex === 1) {
                    const trendEmoji = dataset.data[index] > chart.data.datasets[0].data[index] ? '📈' : '📉';
                    ctx.font = `${fontSize * 0.8}px Arial`;
                    ctx.fillText(trendEmoji, 0, -fontSize);
                }
                
                ctx.restore();
            });
        });
    }
};

const emojiPluginEducation = {
    id: 'emojiPluginEducation',
    beforeTooltipDraw: (chart, args, options) => {
        if (chart.tooltip?.active) return;
        
        const ctx = chart.ctx;
        [0, 1].forEach(datasetIndex => {
            const meta = chart.getDatasetMeta(datasetIndex);
            // Vérifie si le dataset est visible en utilisant la propriété hidden
            if (meta.hidden) return;
            
            meta.data.forEach((element, index) => {
                const model = element;
                const centerX = model.x;
                const centerY = model.y + model.height / 2;
                
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const mainEmojis = [
                    { symbol: '❌', scale: 1.0 },
                    { symbol: '📝', scale: 1.0 },
                    { symbol: '🛠️', scale: 1.0 },
                    { symbol: '📚', scale: 1.0 },
                    { symbol: '🎓', scale: 1.0 }
                ];

                const trendEmojis = {
                    up: '📈',
                    down: '📉'
                };

                const fontSize = Math.min(model.width, 20);
                ctx.font = `${fontSize * mainEmojis[index].scale}px Arial`;
                
                ctx.globalAlpha = 1;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 3;
                ctx.fillStyle = 'white';
                
                ctx.fillText(mainEmojis[index].symbol, 0, 0);

                if (datasetIndex === 1) {
                    const currentValue = chart.data.datasets[1].data[index];
                    const previousValue = chart.data.datasets[0].data[index];
                    const trendEmoji = currentValue > previousValue ? trendEmojis.up : trendEmojis.down;
                    ctx.font = `${fontSize * 0.8}px Arial`;
                    ctx.fillText(trendEmoji, 0, -fontSize);
                }
                
                ctx.restore();
            });
        });
    }
};

const emojiPluginActivity = {
    id: 'emojiPluginActivity',
    beforeTooltipDraw: (chart, args, options) => {
        if (chart.tooltip?.active) return;
        
        const ctx = chart.ctx;
        [0, 1].forEach(datasetIndex => {
            const meta = chart.getDatasetMeta(datasetIndex);
            // Vérifie si le dataset est visible en utilisant la propriété hidden
            if (meta.hidden) return;
            
            meta.data.forEach((element, index) => {
                const model = element;
                const centerX = model.x;
                const centerY = model.y + model.height / 2;
                
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const mainEmojis = [
                    { symbol: '🧑‍💼', scale: 1.0 },
                    { symbol: '🏢', scale: 1.0 }
                ];

                const trendEmojis = {
                    up: '📈',
                    down: '📉'
                };

                const fontSize = Math.min(model.width, 25);
                ctx.font = `${fontSize * mainEmojis[index].scale}px Arial`;
                
                ctx.globalAlpha = 1;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 3;
                ctx.fillStyle = 'white';
                
                ctx.fillText(mainEmojis[index].symbol, 0, 0);

                if (datasetIndex === 1) {
                    const currentValue = chart.data.datasets[1].data[index];
                    const previousValue = chart.data.datasets[0].data[index];
                    const trendEmoji = currentValue > previousValue ? trendEmojis.up : trendEmojis.down;
                    ctx.font = `${fontSize * 0.8}px Arial`;
                    ctx.fillText(trendEmoji, 0, -fontSize);
                }
                
                ctx.restore();
            });
        });
    }
};

const evolutionPlugin = {
    id: 'evolutionPlugin',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        
        if (meta.data.length >= 2) {
            const point1 = meta.data[0];
            const point2 = meta.data[1];
            
            // Position de l'emoji
            const midX = (point1.x + point2.x) / 2;
            const midY = (point1.y + point2.y) / 2;
            const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
            
            // Configuration personnalisable
            const config = {
                emoji: '📈',           // Emoji à utiliser
                fontSize: 100,          // Taille de l'emoji
                verticalOffset: 140,   // Décalage vertical par rapport à la ligne
                horizontalOffset: 0,   // Décalage horizontal
                rotate: false,          // Activer/désactiver la rotation
                shadow: true          // Activer/désactiver l'ombre
            };
            
            ctx.save();
            ctx.translate(midX + config.horizontalOffset, midY);
            
            if (config.rotate) {
                ctx.rotate(angle);
            }
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `${config.fontSize}px Arial`;
            
            if (config.shadow) {
                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
            }
            
            ctx.fillText(config.emoji, 0, config.verticalOffset);
            
            ctx.restore();
        }
    }
};

const emojiPluginAge = {
    id: 'emojiPluginAge',
    afterDatasetDraw: (chart, args) => {
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const year = chart.data.datasets[0].label;
        
        meta.data.forEach((element, index) => {
            if (element.circumference === 0) return;
            
            const model = element;
            const midAngle = model.startAngle + (model.endAngle - model.startAngle) / 2;
            
            const mainRadiusOffset = 0.4;
            const mainRadius = model.innerRadius + (model.outerRadius - model.innerRadius) * mainRadiusOffset;
            
            const mainX = model.x + Math.cos(midAngle) * mainRadius;
            const mainY = model.y + Math.sin(midAngle) * mainRadius;

            const trendRadiusOffset = 0.75;
            const trendRadius = model.innerRadius + (model.outerRadius - model.innerRadius) * trendRadiusOffset;
            
            const trendX = model.x + Math.cos(midAngle) * trendRadius;
            const trendY = model.y + Math.sin(midAngle) * trendRadius;
            
            const emojis = [
                { symbol: '🧒', scale: 1.0 },
                { symbol: '🧑', scale: 1.0 },
                { symbol: '👨', scale: 1.0 },
                { symbol: '🧔', scale: 1.0 },
                { symbol: '🧓', scale: 1.0 },
                { symbol: '👴', scale: 1.0 }
            ];

            const data2009 = [15.1, 16.8, 20.3, 21.2, 16.6, 10.0];
            const data2020 = [15.3, 14.8, 18.9, 20.8, 18.8, 11.5];
            
            const mainFontSize = Math.min(model.outerRadius - model.innerRadius, 30);
            
            ctx.save();
            ctx.translate(mainX, mainY);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `${mainFontSize * emojis[index].scale}px Arial`;
            ctx.globalAlpha = 1;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 3;
            ctx.fillStyle = 'white';
            ctx.fillText(emojis[index].symbol, 0, 0);
            ctx.restore();

            if (year === '2020') {
                ctx.save();
                ctx.translate(trendX, trendY);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const trendEmojis = {
                    up: '📈',
                    down: '📉'
                };

                const trendFontSize = mainFontSize * 0.5;
                ctx.font = `${trendFontSize}px Arial`;
                ctx.globalAlpha = 1;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 3;
                ctx.fillStyle = 'white';

                if (data2020[index] > data2009[index]) {
                    ctx.fillText(trendEmojis.up, 0, 0);
                } else if (data2020[index] < data2009[index]) {
                    ctx.fillText(trendEmojis.down, 0, 0);
                }
                
                ctx.restore();
            }
        });
    }
};

// Configuration des couleurs
const chartColors = {
    population: {
        fill: 'rgba(76, 175, 80, 0.2)',
        line: 'rgba(76, 175, 80, 1)'
    },
    education: {
        2009: 'rgba(33, 150, 243, 0.8)',
        2020: 'rgba(144, 202, 249, 0.8)'
    },
    age: [
        'rgba(156, 39, 176, 0.8)',   // 0-14
        'rgba(255, 193, 7, 0.8)',    // 15-29
        'rgba(255, 87, 34, 0.8)',    // 30-44
        'rgba(0, 188, 212, 0.8)',    // 45-59
        'rgba(30, 67, 200, 0.8)',    // 60-74
        'rgba(76, 175, 80, 0.8)',        // 75+
    ],
    employment: {
        2009: 'rgba(255, 152, 0, 0.8)',
        2020: 'rgba(255, 204, 128, 0.8)'
    },
    activityRate: {
        2009: 'rgba(244, 67, 54, 0.8)',
        2020: 'rgba(239, 154, 154, 0.8)'
    }
};

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#ffffff',
                font: {
                    family: 'Inter',
                    size: 12
                },
                padding: 20,
                usePointStyle: true
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
                family: 'Inter',
                size: 14
            },
            bodyFont: {
                family: 'Inter',
                size: 13
            },
            padding: 12,
            cornerRadius: 8
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
                color: '#ffffff'
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#ffffff'
            }
        }
    }
};


// Configuration spécifique aux graphiques en donut
const donutOptions = {
    ...commonOptions,
    cutout: '60%',
    plugins: {
        ...commonOptions.plugins,
        tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
                label: (context) => {
                    const value = context.parsed;
                    return ` ${context.label}: ${value}%`;
                }
            }
        }
    }
};

delete donutOptions.scales;

// Fonction pour formater les grands nombres
const formatNumber = (value) => {
    return new Intl.NumberFormat('fr-FR').format(value);
};

// Création des graphiques
window.onload = () => {
    // Population - Graphique en ligne
    new Chart(document.getElementById('populationChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['2009', '2020'],
            datasets: [{
                label: 'Population totale',
                data: [305674, 343701],
                backgroundColor: chartColors.population.fill,
                borderColor: chartColors.population.line,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: chartColors.population.line,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Évolution de la population totale',
                    color: '#ffffff',
                    font: { size: 16, weight: 'bold', family: 'Inter' },
                },
                tooltip: {
                    zIndex: 999, // S'assure que le tooltip est toujours au-dessus
                    enabled: true,
                    position: 'average',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                },
            },
            
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    ticks: {
                        callback: formatNumber,
                        color: '#ffffff'
                    }
                }
            }
        },
        plugins: [evolutionPlugin] 
    });

    // Répartition par âge - Graphique en donut 2020
    new Chart(document.getElementById('ageChart2020').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['0-14 ans', '15-29 ans', '30-44 ans', '45-59 ans', '60-74 ans', '75+ ans'],
            datasets: [{
                label: '2020',
                data: [15.3, 14.8, 18.9, 20.8, 18.8, 11.5],
                backgroundColor: chartColors.age
            }]
        },
        options: {
            ...donutOptions,
            plugins: {
                ...donutOptions.plugins,
                title: {
                    display: true,
                    text: 'Répartition par âge en 2020 (%)',
                    color: '#ffffff',
                    font: { size: 16, weight: 'bold', family: 'Inter' }
                }
            }
        },
        plugins: [emojiPluginAge]
    });

    // Répartition par âge - Graphique en donut 2009
    new Chart(document.getElementById('ageChart2009').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['0-14 ans', '15-29 ans', '30-44 ans', '45-59 ans', '60-74 ans', '75+ ans'],
            datasets: [{
                label: '2009',
                data: [15.1, 16.8, 20.3, 21.2, 16.6, 10.0],
                backgroundColor: chartColors.age
            }]
        },
        options: {
            ...donutOptions,
            plugins: {
                ...donutOptions.plugins,
                title: {
                    display: true,
                    text: 'Répartition par âge en 2009 (%)',
                    color: '#ffffff',
                    font: { size: 16, weight: 'bold', family: 'Inter' }
                }
            }
        },
        plugins: [emojiPluginAge]
    });


    //Emploi graphique a barres
    new Chart(document.getElementById('employmentChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Actifs ayant un emploi', 'Nombre d\'emplois'],
            datasets: [{
                label: '2009',
                data: [120153, 119263],
                backgroundColor: chartColors.employment[2009]
            }, {
                label: '2020',
                data: [138682, 137641],
                backgroundColor: chartColors.employment[2020]
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Emploi',
                    color: '#ffffff',
                    font: { size: 16, weight: 'bold', family: 'Inter' }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    ticks: {
                        callback: formatNumber,
                        color: '#ffffff'
                    }
                }
            }
        },
        plugins: [emojiPluginEmployment]
    });

    // Éducation - Graphique à barres
    new Chart(document.getElementById('educationChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Sans diplôme', 'BEPC', 'CAP/BEP', 'Baccalauréat', 'Enseignement supérieur'],
            datasets: [{
                label: '2009',
                data: [31.9, 9.5, 18.5, 20.5, 19.7],
                backgroundColor: chartColors.education[2009]
            }, {
                label: '2020',
                data: [21.5, 8.2, 20.9, 22.6, 26.8],
                backgroundColor: chartColors.education[2020]
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Diplôme le plus élevé de la population non scolarisée de plus de 15 ans (en %)',
                    color: '#ffffff',
                    font: { size: 16, weight: 'bold', family: 'Inter' }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    max: 35,
                }
            }
        },
        plugins: [emojiPluginEducation]
    });

    // Taux d'activité - Graphique à barres
    new Chart(document.getElementById('activityRateChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Taux d\'activité', 'Concentration d\'emploi'],
            datasets: [{
                label: '2009',
                data: [52.3, 99.3],
                backgroundColor: chartColors.activityRate[2009]
            }, {
                label: '2020',
                data: [53.5, 99.2],
                backgroundColor: chartColors.activityRate[2020]
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Taux d\'activité et concentration d\'emploi (%)',
                    color: '#ffffff',
                    font: { size: 16, weight: 'bold', family: 'Inter' }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    max: 100
                }
            }
        },
        plugins: [emojiPluginActivity]
    });
};
