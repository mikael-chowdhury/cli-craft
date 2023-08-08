# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2023-07-08 August 8 2023

### Added

- added plugin functionality | creating and loading plugins
- added plugin registry | keeps track of all plugins actively loaded
- created FilePathPrompt plugin | creates 'path' renderer that autocompletes paths in prompts
- added logger export function | allows the entire log to be exported into the file passed as a parameter

### Fixed

- fixed logging | logging wasn't creating new lines outside of testing

### Removed

- removed strip-ansi, get-cursor-position from dependencies | functionality from these libraries weren't required

## [1.1.3] - 2023-07-08 August 8 2023

### Fixed

- fixed the way local package imports were referenced

## [1.1.4] - 2023-07-08 August 8 2023

### Changed

- made sure dist folder was being published alongside the package :S

## [1.1.5] - 2023-07-08 August 8 2023

### Fixed

- fixed the way global functions were exported

### Changed

- progress bar automatically updates when value is changed

## [1.1.6] - 2023-07-08 August 8 2023

### Changed

- Change to README.md | added list of features, and how to create app via `npx create-cli-craft-app`
