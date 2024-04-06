# Ollama Playground

A simple learning project to practice full stack development through building an Ollama API wrapper.

## Technologies used

- SvelteKit: I've been studying the SvelteKit framework for some time now and wanted to use many of it's features in a single project, such as custom API end points, form actions, and dynamic routing. Many of these concepts I'll implement as the project progresses.

- Tailwind: Experimenting with Tailwind to learn how to use it effectively. I'd like for this to eventually turn into a project where I can develop my own design system and custom ui components, but for now I'll be using mainly base classes and a very simple design.

- Ollama: An application that allows you to interface with local language models such as Llama and Mistral. It provides an API which I'll be using to power this app. Learn more at the [Ollama](https://ollama.com/) webpage.

## Current Features

Currently this app is a very simple chat interface, and it assumes that Ollama is already installed and running locally at its default port, and it only supports one chat session at a time with models that have been downloaded or created through Ollama itself.

The plan is to add more features that interface with the Ollama API, such as creating or editing models, and downloading new models provided by Ollama, as well as supporting multiple chat sessions and more advanced chat features.

I'm also looking to explore integrating a database backend, likely Pocketbase, as well as user authentication and authorization.

## Disclaimer

If you've stumbled on this project then that is fantastic. I would love to hear your thoughts on it, but its primarily a project for personal use and learning. I am making no promises about its stability, and the planned features may or may not be implemented, depending on my time or interest.

All in all, I have no idea what I'm actually doing and I'm just trying to learn what I can through an actual project.

If you are looking for an Ollama interface that is more feature complete, then check out the Ollama Open WebUI projec here: [Ollama Open WebUI](https://github.com/open-webui/open-webui). This has been a source of my inspiration, but I wanted to explore more of SvelteKit's features (even if they may be unnecessary or overkill).
