(function () {
    'use strict';

    define(
        [
            'jquery',
            'safemail',
            'chai'
        ],
        function ($, safemail, chai) {
            var expect = chai.expect;

            describe('The jquery.safemail plugin', function () {
                it('Defines a plugin function', function () {
                    expect($.fn.safemail).to.be.a('function');
                });
                describe('When called', function () {
                    describe('Without options', function () {
                        beforeEach(function () {
                            $('#sandbox')
                                .append($('<input type="text" class="safemail-test" value="input at mailinator dot com" id="test-input" />'))
                                .append($('<span class="safemail-test" id="test-simple">foo at mailinator dot com</span>'))
                                .append($('<span class="safemail-test" id="test-link-text">somebody at some dot domain dot com dot au (Text for link)</span>'))
                                .append($('<span class="safemail-test" title="Subject for email" id="test-title">test at leftclick dot com dot au</span>'))
                                .append($('<span class="safemail-test" title="Better subject for email?" id="test-title-and-link-text">xyzzy at leftclick dot com dot au (Maze of twisty passages all alike)</span>'));
                            $('.safemail-test').safemail();
                        });
                        it('Replaces the value in a `input` element', function () {
                            expect($('#test-input').val()).to.equal('input@mailinator.com');
                        });
                        it('Inserts a link for a `span` element with email address only', function () {
                            var $insertedLink = $('#test-simple').prev();
                            expect($insertedLink.text()).to.equal('foo@mailinator.com');
                            expect($insertedLink.attr('href')).to.equal('mailto:foo@mailinator.com');
                        });
                        it('Inserts a link for a `span` element with email address and link text, but no `title` attribute', function () {
                            var $insertedLink = $('#test-link-text').prev();
                            expect($insertedLink.text()).to.equal('Text for link');
                            expect($insertedLink.attr('href')).to.equal('mailto:somebody@some.domain.com.au');
                        });
                        it('Inserts a link for a `span` element with email address only, and a `title` attribute', function () {
                            var $insertedLink = $('#test-title').prev();
                            expect($insertedLink.text()).to.equal('test@leftclick.com.au');
                            expect($insertedLink.attr('href')).to.equal('mailto:test@leftclick.com.au?subject=Subject%20for%20email');
                        });
                        it('Inserts a link for a `span` element with email address and link text, and a `title` attribute', function () {
                            var $insertedLink = $('#test-title-and-link-text').prev();
                            expect($insertedLink.text()).to.equal('Maze of twisty passages all alike');
                            expect($insertedLink.attr('href')).to.equal('mailto:xyzzy@leftclick.com.au?subject=Better%20subject%20for%20email%3F');
                        });
                        it('Hides the source `span` elements', function () {
                            expect($('#test-simple').is(':visible')).to.equal(false);
                            expect($('#test-link-text').is(':visible')).to.equal(false);
                            expect($('#test-title').is(':visible')).to.equal(false);
                            expect($('#test-title-and-link-text').is(':visible')).to.equal(false);
                        });
                        afterEach(function () {
                            $('#sandbox').empty();
                        });
                    });
                    describe('With options', function () {
                        describe('Overriding the `linkTextRegex` option', function () {
                            beforeEach(function () {
                                $('#sandbox')
                                    .append($('<span class="safemail-test" id="test-link-text">somebody at some dot domain dot com dot au [Text for link]</span>'))
                                    .append($('<span class="safemail-test" title="Better subject for email?" id="test-title-and-link-text">xyzzy at leftclick dot com dot au [Maze of twisty passages all alike]</span>'));
                                $('.safemail-test').safemail({
                                    linkTextRegex: /(.*?)\s+\[(.*?)]/
                                });
                            });
                            it('Inserts a link for a `span` element with email address and link text, but no `title` attribute', function () {
                                var $insertedLink = $('#test-link-text').prev();
                                expect($insertedLink.text()).to.equal('Text for link');
                                expect($insertedLink.attr('href')).to.equal('mailto:somebody@some.domain.com.au');
                            });
                            it('Inserts a link for a `span` element with email address and link text, and a `title` attribute', function () {
                                var $insertedLink = $('#test-title-and-link-text').prev();
                                expect($insertedLink.text()).to.equal('Maze of twisty passages all alike');
                                expect($insertedLink.attr('href')).to.equal('mailto:xyzzy@leftclick.com.au?subject=Better%20subject%20for%20email%3F');
                            });
                            it('Hides the source `span` elements', function () {
                                expect($('#test-link-text').is(':visible')).to.equal(false);
                                expect($('#test-title-and-link-text').is(':visible')).to.equal(false);
                            });
                            afterEach(function () {
                                $('#sandbox').empty();
                            });
                        });
                        describe('Overriding the `atRegex` and `dotRegex` options', function () {
                            beforeEach(function () {
                                $('#sandbox')
                                    .append($('<input type="text" class="safemail-test" value="input {{AT}} mailinator {{DOT}} com" id="test-input" />'))
                                    .append($('<span class="safemail-test" id="test-simple">foo {{AT}} example {{DOT}} com {{DOT}} au</span>'));
                                $('.safemail-test').safemail({
                                    atRegex: /\s+\{\{AT}}\s+/g,
                                    dotRegex: /\s+\{\{DOT}}\s+/g
                                });
                            });
                            it('Replaces the value in a `input` element', function () {
                                expect($('#test-input').val()).to.equal('input@mailinator.com');
                            });
                            it('Inserts a link for a `span` element', function () {
                                var $insertedLink = $('#test-simple').prev();
                                expect($insertedLink.attr('href')).to.equal('mailto:foo@example.com.au');
                            });
                            it('Hides the source `span` elements', function () {
                                expect($('#test-simple').is(':visible')).to.equal(false);
                            });
                            afterEach(function () {
                                $('#sandbox').empty();
                            });
                        });
                        describe('Overriding the `applyTitleAsSubject` option', function () {
                            beforeEach(function () {
                                $('#sandbox')
                                    .append($('<span class="safemail-test" title="Subject for email" id="test-title">test at leftclick dot com dot au</span>'))
                                    .append($('<span class="safemail-test" title="Better subject for email?" id="test-title-and-link-text">xyzzy at leftclick dot com dot au (Maze of twisty passages all alike)</span>'));
                                $('.safemail-test').safemail({
                                    applyTitleAsSubject: false
                                });
                            });
                            it('Inserts a link for a `span` element with email address only, and a `title` attribute', function () {
                                var $insertedLink = $('#test-title').prev();
                                expect($insertedLink.text()).to.equal('test@leftclick.com.au');
                                expect($insertedLink.attr('href')).to.equal('mailto:test@leftclick.com.au');
                            });
                            it('Inserts a link for a `span` element with email address and link text, and a `title` attribute', function () {
                                var $insertedLink = $('#test-title-and-link-text').prev();
                                expect($insertedLink.text()).to.equal('Maze of twisty passages all alike');
                                expect($insertedLink.attr('href')).to.equal('mailto:xyzzy@leftclick.com.au');
                            });
                            it('Hides the source `span` elements', function () {
                                expect($('#test-title').is(':visible')).to.equal(false);
                                expect($('#test-title-and-link-text').is(':visible')).to.equal(false);
                            });
                            afterEach(function () {
                                $('#sandbox').empty();
                            });
                        });
                    });
                });
            });
        }
    );
}());