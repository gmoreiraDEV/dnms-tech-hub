import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    // adiciona suporte ao SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                {name: 'removeViewBox', active: false},
                {name: 'removeDimensions', active: true},
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
