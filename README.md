## Running Locally

# Issues with Ruby Version

This app uses Ruby 2.7.6. I use rbenv to set the Ruby version locally. However, sometimes there are issues where the Ruby version is not set correctly. If you run into this issue, you can run the following command to set the Ruby version:

```zsh
rbenv local 2.7.6
```

If after running that command you still get an error like this:

```zsh
Your Ruby version is 3.2.2, but your Gemfile specified 2.7.6
```

Then the issue is likely that for whatever reason your PATH does not contain a necessary reference to rbenv. You can fix this by running the following command:

```zsh
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

I've ran into this issue a few times and I'm not sure what keeps resetting the PATH but this is a good fix. I got it from this StackOverflow post: https://stackoverflow.com/questions/10940736/rbenv-not-changing-ruby-version
