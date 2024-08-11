import { expect } from 'chai';
import BpmnModdle from 'bpmn-moddle';
import { readFile } from '../lib/file.js';
import {
  anonymizeReferences,
  anonymizeFlowElements,
  anonymizeCategoryValue,
  anonymizeArtifacts,
  anonymizeParticipants } from '../lib/anonymize.js';



describe('anonymize', function() {

  it('should anonymize simple process', async function() {

    // given
    const moddle = new BpmnModdle();
    const { references, rootElement } = await readFile(moddle, 'test/bpmn/simple.bpmn');

    // when
    anonymizeReferences(references);

    // then
    expect(rootElement.rootElements[0].flowElements[0].name).to.eql('Start Event');
    expect(rootElement.rootElements[0].flowElements[1].name).to.eql('Task');
    expect(rootElement.rootElements[0].flowElements[3].name).to.eql('End Event');
  });


  it('should anonymize unconnected elements', async function() {

    // given
    const moddle = new BpmnModdle();
    const { rootElement } = await readFile(moddle, 'test/bpmn/subprocess.bpmn');

    // when
    anonymizeFlowElements(rootElement);

    // then
    expect(rootElement.rootElements[0].flowElements[0].name).to.eql('Data Object Reference');
    expect(rootElement.rootElements[0].flowElements[2].name).to.eql('Data Store Reference');
  });


  it('should anonymize group name', async function() {

    // given
    const moddle = new BpmnModdle();
    const { rootElement } = await readFile(moddle, 'test/bpmn/group.bpmn');

    // when
    anonymizeCategoryValue(rootElement);

    // then
    expect(rootElement.rootElements[1].categoryValue[0].value).to.eql('Category');
  });


  it('should anonymize text annotation', async function() {

    // given
    const moddle = new BpmnModdle();
    const { rootElement } = await readFile(moddle, 'test/bpmn/text-annotation.bpmn');

    // when
    anonymizeArtifacts(rootElement);

    // then
    expect(rootElement.rootElements[0].artifacts[0].text).to.eql('Text Annotation');
    expect(rootElement.rootElements[0].artifacts[2].text).to.eql('Text Annotation');
  });


  it('should anonymize participant name', async function() {

    // given
    const moddle = new BpmnModdle();
    const { rootElement } = await readFile(moddle, 'test/bpmn/participants.bpmn');

    // when
    anonymizeParticipants(rootElement);

    // then
    expect(rootElement.rootElements[0].participants[0].name).to.eql('Participant');
    expect(rootElement.rootElements[0].participants[1].name).to.eql('Participant');
  });

});