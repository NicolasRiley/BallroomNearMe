# BallroomNearMe

A venue directory app for the London Ballroom scene — built to help organisers find affordable, community-vetted spaces to host Balls, Vogue Classes, and Kiki Lounges.

## Background

Finding venues for Ballroom events in London is harder than it should be. Organisers rely on informal networks and word of mouth, and there's no centralised resource that accounts for the things that actually matter to the community: LGBTQ+ safety, cultural history, capacity for performance, and price. BallroomNearMe is an attempt to make that knowledge findable.

Built as a final project for UAL, with the intention of continuing development beyond the classroom.

## Features

- Browse venues filtered by event type (Ball, Vogue Class, Kiki Lounge)
- Venue profiles with capacity, safety information, and booking CTA
- LGBTQ+ area safety context per venue
- Save venues for later
- Two-step booking flow (date picker + summary)
- Account screen with sign-in/sign-out states

## Tech Stack

- React Native + Expo SDK 54
- TypeScript
- React Navigation (Bottom Tab + Native Stack)
- React Context for saved venues state

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on your device, or press `i` for iOS simulator / `a` for Android emulator.

## Project Structure
```plaintext
src/
├── screens/        # HomeScreen, VenueListScreen, VenueDetailScreen, AccountScreen
├── components/     # VenueCard, SafetyBadge, SafetyModal, SignInModal
├── data/           # Hardcoded venue data
├── hooks/          # useSavedVenues
├── navigation/     # Tab and stack navigator configuration
└── types/          # TypeScript types
```

## Current State

All venue data is hardcoded from community knowledge — spaces that have either hosted Ball events in the past or were recommended directly through interviews. This is intentional; the cultural weight of a venue's history within the scene is treated as a product feature, not a limitation.

## Roadmap

- Community-editable data layer (moving beyond hardcoded venues)
- Historical significance badges for venues with cultural history
- Event visibility on booking dates
- Performer-facing event discovery flow

## Research

This app was built on original community research: 8 discovery interviews with London Ballroom performers, organisers, and community workers, followed by two rounds of moderated usability testing. All participants provided informed consent.

## Acknowledgements

Thank you to everyone in the London Ballroom scene who gave their time and knowledge to this project.
